// Holiday configuration
const HOLIDAYS = {
    'christmas': {
        name: 'Christmas',
        getDate: (year) => new Date(year, 11, 25), // December 25
        icon: '🎄'
    },
    'new-year': {
        name: 'New Year',
        getDate: (year) => new Date(year, 0, 1), // January 1
        icon: '🎉'
    },
    'halloween': {
        name: 'Halloween',
        getDate: (year) => new Date(year, 9, 31), // October 31
        icon: '👻'
    },
    'thanksgiving': {
        name: 'Thanksgiving',
        getDate: (year) => {
            // Thanksgiving is the 4th Thursday of November
            const november = new Date(year, 10, 1);
            const dayOfWeek = november.getDay();
            const daysToAdd = (4 - dayOfWeek + 7) % 7 + 21; // 21 days to get to 4th Thursday
            return new Date(year, 10, 1 + daysToAdd);
        },
        icon: '🦃'
    },
    'independence-day': {
        name: 'Independence Day',
        getDate: (year) => new Date(year, 6, 4), // July 4
        icon: '🎆'
    },
    'veterans-day': {
        name: 'Veterans Day',
        getDate: (year) => new Date(year, 10, 11), // November 11
        icon: '🎖️'
    },
    'columbus-day': {
        name: 'Columbus Day',
        getDate: (year) => {
            // Columbus Day is the 2nd Monday of October
            const october = new Date(year, 9, 1);
            const dayOfWeek = october.getDay();
            const daysToAdd = (1 - dayOfWeek + 7) % 7 + 7; // 7 days to get to 2nd Monday
            return new Date(year, 9, 1 + daysToAdd);
        },
        icon: '🌍'
    },
    'labor-day': {
        name: 'Labor Day',
        getDate: (year) => {
            // Labor Day is the 1st Monday of September
            const september = new Date(year, 8, 1);
            const dayOfWeek = september.getDay();
            const daysToAdd = (1 - dayOfWeek + 7) % 7;
            return new Date(year, 8, 1 + daysToAdd);
        },
        icon: '💼'
    },
    'memorial-day': {
        name: 'Memorial Day',
        getDate: (year) => {
            // Memorial Day is the last Monday of May
            const may = new Date(year, 4, 31);
            const dayOfWeek = may.getDay();
            const daysToSubtract = dayOfWeek;
            return new Date(year, 4, 31 - daysToSubtract);
        },
        icon: '🇺🇸'
    },
    'presidents-day': {
        name: 'Presidents Day',
        getDate: (year) => {
            // Presidents Day is the 3rd Monday of February
            const february = new Date(year, 1, 1);
            const dayOfWeek = february.getDay();
            const daysToAdd = (1 - dayOfWeek + 7) % 7 + 14; // 14 days to get to 3rd Monday
            return new Date(year, 1, 1 + daysToAdd);
        },
        icon: '🏛️'
    },
    'mlk-day': {
        name: 'MLK Jr. Day',
        getDate: (year) => {
            // MLK Jr. Day is the 3rd Monday of January
            const january = new Date(year, 0, 1);
            const dayOfWeek = january.getDay();
            const daysToAdd = (1 - dayOfWeek + 7) % 7 + 14; // 14 days to get to 3rd Monday
            return new Date(year, 0, 1 + daysToAdd);
        },
        icon: '✊'
    },
    'fathers-day': {
        name: "Father's Day",
        getDate: (year) => {
            // Father's Day is the 3rd Sunday of June
            const june = new Date(year, 5, 1);
            const dayOfWeek = june.getDay();
            const daysToAdd = (0 - dayOfWeek + 7) % 7 + 14; // 14 days to get to 3rd Sunday
            return new Date(year, 5, 1 + daysToAdd);
        },
        icon: '👨'
    }
};

class CountdownTimer {
    constructor() {
        this.countdownElement = document.querySelector('.countdown');
        this.holidayNameElement = document.querySelector('.holiday-name');
        this.currentHoliday = null;
        this.intervalId = null;
        this.recentHolidays = [];
        this.initializeEventListeners();
        this.addCalculatorControls();
    }

    addCalculatorControls() {
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'calculator-controls';
        
        // Add Clear button
        const clearBtn = document.createElement('button');
        clearBtn.className = 'control-btn clear-btn';
        clearBtn.innerHTML = '<span class="icon">🗑️</span><span class="label">Clear</span>';
        clearBtn.addEventListener('click', () => this.clearCountdown());

        // Add Next Holiday button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'control-btn next-btn';
        nextBtn.innerHTML = '<span class="icon">⏭️</span><span class="label">Next Holiday</span>';
        nextBtn.addEventListener('click', () => this.showNextHoliday());

        controlsContainer.appendChild(clearBtn);
        controlsContainer.appendChild(nextBtn);
        document.querySelector('.countdown-display').prepend(controlsContainer);
    }

    clearCountdown() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.currentHoliday = null;
        this.holidayNameElement.textContent = '____';
        this.countdownElement.textContent = 'Select a holiday';
        document.querySelectorAll('.holiday-btn').forEach(btn => btn.classList.remove('active'));
    }

    showNextHoliday() {
        const now = new Date();
        let nextHoliday = null;
        let nextDate = null;
        let minDays = Infinity;

        // Check all holidays
        Object.entries(HOLIDAYS).forEach(([id, holiday]) => {
            const currentYear = now.getFullYear();
            let date = holiday.getDate(currentYear);

            // If the holiday has passed this year, check next year
            if (date < now) {
                date = holiday.getDate(currentYear + 1);
            }

            const daysUntil = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
            if (daysUntil < minDays) {
                minDays = daysUntil;
                nextHoliday = id;
                nextDate = date;
            }
        });

        if (nextHoliday) {
            this.startCountdown(nextHoliday);
        }
    }

    initializeEventListeners() {
        document.querySelectorAll('.holiday-btn').forEach(button => {
            button.addEventListener('click', () => {
                const holidayId = button.dataset.holiday;
                this.startCountdown(holidayId);
            });
        });

        document.querySelectorAll('.share-btn').forEach(button => {
            button.addEventListener('click', () => {
                const platform = button.dataset.platform;
                this.shareCountdown(platform);
            });
        });
    }

    startCountdown(holidayId) {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        const holiday = HOLIDAYS[holidayId];
        if (!holiday) {
            console.error('Invalid holiday selected');
            return;
        }

        // Update active state
        document.querySelectorAll('.holiday-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.holiday === holidayId) {
                btn.classList.add('active');
            }
        });

        // Add to recent holidays
        if (!this.recentHolidays.includes(holidayId)) {
            this.recentHolidays.unshift(holidayId);
            if (this.recentHolidays.length > 3) {
                this.recentHolidays.pop();
            }
        }

        this.currentHoliday = holiday;
        this.holidayNameElement.textContent = holiday.name;
        this.updateCountdown();
        this.intervalId = setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        try {
            const now = new Date();
            const currentYear = now.getFullYear();
            let targetDate = this.currentHoliday.getDate(currentYear);

            // If the holiday has passed this year, calculate for next year
            if (targetDate < now) {
                targetDate = this.currentHoliday.getDate(currentYear + 1);
            }

            const timeRemaining = this.calculateTimeRemaining(targetDate);
            this.displayTimeRemaining(timeRemaining);
        } catch (error) {
            console.error('Error updating countdown:', error);
            this.countdownElement.textContent = 'Error calculating time';
        }
    }

    calculateTimeRemaining(targetDate) {
        const now = new Date();
        const total = targetDate - now;

        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((total % (1000 * 60)) / 1000);

        return {
            days,
            hours,
            minutes,
            seconds,
            total
        };
    }

    displayTimeRemaining(time) {
        if (time.total <= 0) {
            this.countdownElement.textContent = "It's here! 🎉";
            clearInterval(this.intervalId);
            return;
        }

        this.countdownElement.textContent = 
            `${time.days} days ${time.hours} hours ${time.minutes} minutes ${time.seconds} seconds`;
    }

    shareCountdown(platform) {
        if (!this.currentHoliday) {
            console.error('No holiday selected');
            return;
        }

        const countdownText = this.countdownElement.textContent;
        const holidayName = this.currentHoliday.name;
        const shareText = `🎉 ${holidayName} is coming! ${countdownText} 🎉`;

        switch (platform) {
            case 'twitter':
                const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                window.open(twitterUrl, '_blank', 'width=600,height=400');
                break;

            case 'whatsapp':
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
                window.open(whatsappUrl, '_blank', 'width=600,height=400');
                break;

            case 'facebook':
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`;
                window.open(facebookUrl, '_blank', 'width=600,height=400');
                break;

            case 'copy':
                navigator.clipboard.writeText(shareText).then(() => {
                    // Show feedback
                    const button = document.querySelector('[data-platform="copy"]');
                    const originalText = button.querySelector('.label').textContent;
                    button.querySelector('.label').textContent = 'Copied!';
                    setTimeout(() => {
                        button.querySelector('.label').textContent = originalText;
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy text:', err);
                });
                break;
        }
    }
}

// Initialize the countdown timer when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
});