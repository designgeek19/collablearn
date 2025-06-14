// Main Application Class
class CollabLearnApp {
  constructor() {
    this.init();
    this.setupEventListeners();
    this.setupAnimations();
    this.setupStudyTimer();
    this.setupModals();
    this.setupNotifications();
    this.setupRealTimeFeatures();
  }

  init() {
    // Initialize all components
    this.loadUserData();
    this.setupResponsiveDesign();
    this.setupDarkMode();
  }

  // Load user data (simulated)
  loadUserData() {
    // In a real app, this would fetch from an API
    const userData = {
      name: "Sarah Johnson",
      university: "University of Abuja",
      level: 3,
      streak: 5,
      xp: 65,
      posts: 125,
      followers: 458,
      following: 234
    };

    // Update UI with user data
    document.querySelector('.profile-card h3').textContent = userData.name;
    document.querySelector('.profile-card p').textContent = `Computer Science Student at ${userData.university}`;
    document.querySelector('.level-badge').textContent = `Lvl ${userData.level}`;
    document.querySelector('.streak-counter span').textContent = userData.streak;
    document.querySelector('.xp-fill').style.width = `${userData.xp}%`;

    // Update stats
    document.querySelectorAll('.stat h4')[0].textContent = userData.posts;
    document.querySelectorAll('.stat h4')[1].textContent = userData.followers;
    document.querySelectorAll('.stat h4')[2].textContent = userData.following;
  }

  // Set up event listeners
  setupEventListeners() {
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
      });
    }

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
      button.addEventListener('click', () => this.handleTabClick(button));
    });

    // Follow button functionality
    const followButtons = document.querySelectorAll('.follow-button, .friend-action');
    followButtons.forEach(button => {
      button.addEventListener('click', () => this.handleFollowClick(button));
    });

    // Like/Comment/Share button functionality
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
      button.addEventListener('click', () => this.handleActionClick(button));
    });

    // Post creation buttons
    const createPostButton = document.querySelector('.post-option:first-child');
    if (createPostButton) {
      createPostButton.addEventListener('click', () => this.showCreatePostModal());
    }

    const createEventButton = document.querySelector('.post-option:nth-child(3)');
    if (createEventButton) {
      createEventButton.addEventListener('click', () => this.showCreateEventModal());
    }
  }

  // Handle tab clicks
  handleTabClick(button) {
    const tabId = button.getAttribute('data-tab');

    // Remove active class from all buttons and contents
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  }

  // Handle follow button clicks
  handleFollowClick(button) {
    if (button.textContent === 'Follow' || button.textContent === 'Connect') {
      button.textContent = 'Following';
      button.style.backgroundColor = '#10B981';
      button.style.color = 'white';
      this.showNotification('You are now following this user', 'success');
    } else {
      button.textContent = 'Follow';
      button.style.backgroundColor = 'var(--primary)';
      this.showNotification('You have unfollowed this user', 'info');
    }
  }

  // Handle action button clicks (like, comment, share)
  handleActionClick(button) {
    const countElement = button.querySelector('.count');
    if (countElement) {
      let count = parseInt(countElement.textContent);
      countElement.textContent = count + 1;

      // Visual feedback
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 100);

      // Show appropriate notification
      const action = button.querySelector('i').className;
      if (action.includes('thumbs-up')) {
        this.showNotification('Liked!', 'success');
      } else if (action.includes('comment')) {
        this.showNotification('Comment added!', 'info');
      } else if (action.includes('share')) {
        this.showNotification('Shared!', 'info');
      }
    }
  }

  // Set up animations
  setupAnimations() {
    // Card hover animations
    const cards = document.querySelectorAll('.card, .buddy-card, .question-card, .note-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'none';
        card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      });
    });

    // Add fade-in animation to all elements with .fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
      element.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // Set up study timer functionality
  setupStudyTimer() {
    const timerDisplay = document.querySelector('.timer-display');
    const startButton = document.querySelector('.timer-controls .button:first-child');
    const pauseButton = document.querySelector('.timer-controls .button:nth-child(2)');
    const resetButton = document.querySelector('.timer-controls .button:last-child');
    const pomodoroButtons = document.querySelectorAll('.pomodoro-options .button');

    let timer;
    let timeLeft = 25 * 60; // 25 minutes in seconds
    let isRunning = false;

    // Format time as MM:SS
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Update timer display
    const updateTimer = () => {
      timerDisplay.textContent = formatTime(timeLeft);
    };

    // Start timer
    const startTimer = () => {
      if (isRunning) return;

      isRunning = true;
      timer = setInterval(() => {
        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
          clearInterval(timer);
          isRunning = false;
          this.showNotification('Study session completed! Take a break!', 'success');
        }
      }, 1000);
    };

    // Pause timer
    const pauseTimer = () => {
      clearInterval(timer);
      isRunning = false;
    };

    // Reset timer
    const resetTimer = () => {
      pauseTimer();
      timeLeft = parseInt(timerDisplay.textContent.split(':')[0]) * 60 +
                 parseInt(timerDisplay.textContent.split(':')[1]);
      updateTimer();
    };

    // Set timer duration
    const setTimerDuration = (minutes) => {
      pauseTimer();
      timeLeft = minutes * 60;
      updateTimer();

      // Update active button state
      pomodoroButtons.forEach(button => button.classList.remove('active'));

      if (minutes === 25) {
        pomodoroButtons[0].classList.add('active');
      } else if (minutes === 50) {
        pomodoroButtons[1].classList.add('active');
      } else if (minutes === 90) {
        pomodoroButtons[2].classList.add('active');
      }
    };

    // Event listeners
    if (startButton) startButton.addEventListener('click', startTimer);
    if (pauseButton) pauseButton.addEventListener('click', pauseTimer);
    if (resetButton) resetButton.addEventListener('click', resetTimer);

    pomodoroButtons.forEach(button => {
      button.addEventListener('click', function() {
        const minutes = parseInt(this.textContent);
        setTimerDuration(minutes);
      });
    });

    // Initialize timer display
    updateTimer();
  }

  // Set up modal functionality
  setupModals() {
    // Create modal function
    this.createModal = (title, content, buttons = []) => {
      const modal = document.createElement('div');
      modal.className = 'modal';

      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content';

      const modalHeader = document.createElement('div');
      modalHeader.className = 'modal-header';

      const modalTitle = document.createElement('h3');
      modalTitle.textContent = title;

      const closeButton = document.createElement('button');
      closeButton.className = 'modal-close';
      closeButton.innerHTML = '<i class="fas fa-times"></i>';

      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(closeButton);

      const modalBody = document.createElement('div');
      modalBody.className = 'modal-body';
      modalBody.innerHTML = content;

      const modalFooter = document.createElement('div');
      modalFooter.className = 'modal-footer';

      buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.className = button.class;
        btn.textContent = button.text;
        btn.addEventListener('click', button.handler);
        modalFooter.appendChild(btn);
      });

      modalContent.appendChild(modalHeader);
      modalContent.appendChild(modalBody);
      modalContent.appendChild(modalFooter);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      // Close modal when clicking outside or on close button
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === closeButton) {
          document.body.removeChild(modal);
        }
      });

      return modal;
    };

    // Create Post modal
    this.showCreatePostModal = () => {
      const modal = this.createModal(
        'Create New Post',
        `
          <div class="form-group">
            <label for="post-title">Title</label>
            <input type="text" id="post-title" class="input" placeholder="Enter post title">
          </div>
          <div class="form-group">
            <label for="post-content">Content</label>
            <textarea id="post-content" class="input" rows="5" placeholder="What's on your mind?"></textarea>
          </div>
          <div class="form-group">
            <label for="post-tags">Tags</label>
            <input type="text" id="post-tags" class="input" placeholder="e.g., python, algorithms">
          </div>
        `,
        [
          {
            text: 'Cancel',
            class: 'button button-outline',
            handler: () => document.body.removeChild(document.querySelector('.modal'))
          },
          {
            text: 'Post',
            class: 'button button-primary',
            handler: () => {
              const title = document.getElementById('post-title').value;
              const content = document.getElementById('post-content').value;
              const tags = document.getElementById('post-tags').value;

              // In a real app, you would send this data to your backend
              console.log('Post created:', { title, content, tags });
              this.showNotification('Post created successfully!', 'success');
              document.body.removeChild(document.querySelector('.modal'));
            }
          }
        ]
      );
    };

    // Create Event modal
    this.showCreateEventModal = () => {
      const modal = this.createModal(
        'Create New Event',
        `
          <div class="form-group">
            <label for="event-title">Title</label>
            <input type="text" id="event-title" class="input" placeholder="Event title">
          </div>
          <div class="form-group">
            <label for="event-description">Description</label>
            <textarea id="event-description" class="input" rows="3" placeholder="Event description"></textarea>
          </div>
          <div class="form-group">
            <label for="event-date">Date & Time</label>
            <input type="datetime-local" id="event-date" class="input">
          </div>
          <div class="form-group">
            <label for="event-location">Location</label>
            <input type="text" id="event-location" class="input" placeholder="Event location">
          </div>
        `,
        [
          {
            text: 'Cancel',
            class: 'button button-outline',
            handler: () => document.body.removeChild(document.querySelector('.modal'))
          },
          {
            text: 'Create Event',
            class: 'button button-primary',
            handler: () => {
              const title = document.getElementById('event-title').value;
              const description = document.getElementById('event-description').value;
              const date = document.getElementById('event-date').value;
              const location = document.getElementById('event-location').value;

              // In a real app, you would send this data to your backend
              console.log('Event created:', { title, description, date, location });
              this.showNotification('Event created successfully!', 'success');
              document.body.removeChild(document.querySelector('.modal'));
            }
          }
        ]
      );
    };
  }

  // Set up notification system
  setupNotifications() {
    // Create notification function
    this.showNotification = (message, type = 'info') => {
      const notification = document.createElement('div');
      notification.className = `notification notification-${type}`;

      const iconMap = {
        'info': 'fa-info-circle',
        'success': 'fa-check-circle',
        'warning': 'fa-exclamation-triangle',
        'error': 'fa-exclamation-circle'
      };

      notification.innerHTML = `
        <div class="notification-icon">
          <i class="fas ${iconMap[type]}"></i>
        </div>
        <div class="notification-content">
          <p>${message}</p>
        </div>
        <button class="notification-close">
          <i class="fas fa-times"></i>
        </button>
      `;

      document.body.appendChild(notification);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }, 5000);

      // Close button functionality
      notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      });
    };

    // Add CSS for notifications
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
      .notification {
        position: fixed;
        top: 1.5rem;
        right: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        background-color: white;
        border-radius: 0.75rem;
        padding: 1rem 1.5rem;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        transition: opacity 0.3s ease;
      }

      .notification-info {
        border-left: 4px solid #3B82F6;
      }

      .notification-success {
        border-left: 4px solid #10B981;
      }

      .notification-warning {
        border-left: 4px solid #F59E0B;
      }

      .notification-error {
        border-left: 4px solid #EF4444;
      }

      .notification-icon {
        font-size: 1.25rem;
      }

      .notification-info .notification-icon {
        color: #3B82F6;
      }

      .notification-success .notification-icon {
        color: #10B981;
      }

      .notification-warning .notification-icon {
        color: #F59E0B;
      }

      .notification-error .notification-icon {
        color: #EF4444;
      }

      .notification-close {
        background: none;
        border: none;
        color: #9CA3AF;
        cursor: pointer;
        margin-left: auto;
      }

      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(notificationStyle);
  }

  // Set up responsive design
  setupResponsiveDesign() {
    // Add responsive styles
    const responsiveStyle = document.createElement('style');
    responsiveStyle.textContent = `
      @media (max-width: 1200px) {
        .dashboard {
          grid-template-columns: 200px 1fr;
        }

        .right-sidebar {
          display: none;
        }
      }

      @media (max-width: 992px) {
        .dashboard {
          grid-template-columns: 1fr;
        }

        .sidebar {
          display: none;
        }

        .content-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 768px) {
        .navbar .container {
          flex-direction: column;
          gap: 1rem;
        }

        .nav-links {
          flex-direction: column;
          width: 100%;
        }

        .user-section {
          width: 100%;
          justify-content: space-between;
        }

        .xp-bar {
          width: 100px;
        }

        .profile-info {
          flex-direction: column;
          align-items: flex-start;
        }

        .stats {
          flex-direction: column;
          gap: 1rem;
        }

        .quick-actions {
          flex-direction: column;
          gap: 0.5rem;
        }

        .button {
          width: 100%;
        }
      }

      .mobile-nav-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #211951;
        padding: 0.5rem;
        margin-right: auto;
      }

      @media (max-width: 768px) {
        .mobile-nav-toggle {
          display: block;
        }

        .nav-links {
          display: none;
        }

        .nav-links.active {
          display: flex;
        }

        .nav-links a {
          width: 100%;
          justify-content: flex-start;
        }
      }
    `;
    document.head.appendChild(responsiveStyle);
  }

  // Set up dark mode
  setupDarkMode() {
    // Check for saved user preference or use system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
      document.body.classList.add('dark-mode');
    }

    // Listen for changes to the user's preference
    prefersDarkScheme.addEventListener('change', e => {
      if (e.matches) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });

    // Add dark mode toggle button
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });

    // Add to navbar
    const navbar = document.querySelector('.navbar .container');
    if (navbar) {
      navbar.appendChild(darkModeToggle);
    }

    // Add CSS for dark mode toggle
    const darkModeStyle = document.createElement('style');
    darkModeStyle.textContent = `
      .dark-mode-toggle {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0.5rem;
      }

      .dark-mode {
        --background: #111827;
        --card-bg: #1F2937;
        --text-primary: #F9FAFB;
        --text-secondary: #9CA3AF;
      }

      .dark-mode .navbar,
      .dark-mode .card,
      .dark-mode .sidebar,
      .dark-mode .profile-card,
      .dark-mode .sidebar-nav,
      .dark-mode .trending-topics,
      .dark-mode .achievements-card,
      .dark-mode .study-timer-card,
      .dark-mode .welcome-card,
      .dark-mode .note-card,
      .dark-mode .question-card,
      .dark-mode .modal-content {
        background-color: var(--card-bg);
      }

      .dark-mode .input {
        background-color: var(--card-bg);
        border-color: #374151;
      }

      .dark-mode .input:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.5);
      }
    `;
    document.head.appendChild(darkModeStyle);
  }

  // Set up real-time features (simulated)
  setupRealTimeFeatures() {
    // Simulate real-time updates
    setInterval(() => {
      // Simulate new notifications
      if (Math.random() > 0.8) {
        const notificationTypes = ['info', 'success', 'warning'];
        const randomType = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const messages = [
          'New study session starting soon!',
          'You have a new message from a study buddy',
          'Your question received a new answer',
          'Reminder: Take a break after your study session'
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        this.showNotification(randomMessage, randomType);
      }

      // Simulate XP progress
      const xpFill = document.querySelector('.xp-fill');
      if (xpFill) {
        let currentXP = parseInt(xpFill.style.width) || 0;
        if (currentXP < 100) {
          currentXP += Math.floor(Math.random() * 3);
          if (currentXP > 100) currentXP = 100;
          xpFill.style.width = `${currentXP}%`;

          // Show level up notification if XP reaches 100
          if (currentXP === 100) {
            this.showNotification('Level up! You reached a new level!', 'success');
            setTimeout(() => {
              xpFill.style.width = '0%';
            }, 3000);
          }
        }
      }
    }, 10000); // Check every 10 seconds

    // Simulate study buddy suggestions
    const buddyCards = document.querySelectorAll('.buddy-card');
    if (buddyCards.length > 0) {
      setInterval(() => {
        const randomBuddy = {
          name: ['Michael Chen', 'Emily Davis', 'James Wilson', 'Sophia Martinez'][Math.floor(Math.random() * 4)],
          university: ['Harvard University', 'Stanford University', 'MIT', 'University of Texas'][Math.floor(Math.random() * 4)],
          subjects: ['Python', 'Machine Learning', 'Algorithms', 'Data Science', 'Web Development'][Math.floor(Math.random() * 5)]
        };

        const buddyCard = document.createElement('div');
        buddyCard.className = 'buddy-card';
        buddyCard.innerHTML = `
          <div class="buddy-info">
            <img src="https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg" alt="Buddy" class="buddy-avatar">
            <div>
              <h4>${randomBuddy.name}</h4>
              <p>${randomBuddy.university}</p>
            </div>
          </div>
          <div class="buddy-tags">
            <span class="badge">${randomBuddy.subjects}</span>
          </div>
          <div class="buddy-actions">
            <button class="button button-outline"><i class="fas fa-user-plus"></i> Connect</button>
            <button class="button button-secondary"><i class="fas fa-comments"></i> Message</button>
          </div>
        `;

        // Add to the study buddy section
        const studyBuddySection = document.querySelector('.study-buddy');
        if (studyBuddySection) {
          studyBuddySection.insertBefore(buddyCard, studyBuddySection.firstChild);
          this.showNotification(`New study buddy suggestion: ${randomBuddy.name}`, 'info');
        }
      }, 30000); // Add new buddy every 30 seconds
    }
  }
}

// Initialize the application
const app = new CollabLearnApp();
