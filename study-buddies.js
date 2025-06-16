// Study Buddies Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the page
  initStudyBuddiesPage();

  // Set up dark mode toggle
  setupDarkMode();

  // Set up mobile navigation
  setupMobileNavigation();

  // Set up modals
  setupModals();

  // Set up notifications
  setupNotifications();

  // Set up real-time features
  setupRealTimeFeatures();

  // Set up chat functionality
  setupChatFunctionality();

  // Set up buddy search
  setupBuddySearch();
});

/**
 * Initialize the study buddies page
 */
function initStudyBuddiesPage() {
  // Add fade-in animation to elements
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.1}s`;
  });

  // Set up tab functionality
  setupTabFunctionality();

  // Set up action buttons
  setupActionButtons();

  // Set up buddy cards
  setupBuddyCards();

  // Set up chat functionality
  setupChatFunctionality();
}

/**
 * Set up dark mode toggle functionality
 */
function setupDarkMode() {
  // Check for saved user preference or use system preference
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = localStorage.getItem('theme');
  const darkModeToggle = document.querySelector('.dark-mode-toggle');

  // Apply saved theme or system preference
  if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-mode');
  }

  // Add click event to dark mode toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });
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
}

/**
 * Set up mobile navigation toggle
 */
function setupMobileNavigation() {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

/**
 * Set up tab functionality
 */
function setupTabFunctionality() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabId = button.getAttribute('data-tab');

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

/**
 * Set up action buttons
 */
function setupActionButtons() {
  // Find Buddy button
  const findBuddyButton = document.querySelector('.find-buddy-button');
  if (findBuddyButton) {
    findBuddyButton.addEventListener('click', () => {
      showFindBuddyModal();
    });
  }

  // Create Group button
  const createGroupButton = document.querySelector('.create-group-button');
  if (createGroupButton) {
    createGroupButton.addEventListener('click', () => {
      showCreateGroupModal();
    });
  }

  // Sort button
  const sortButton = document.querySelector('.sort-button');
  if (sortButton) {
    sortButton.addEventListener('click', () => {
      showSortOptionsModal();
    });
  }

  // New Group button
  const newGroupButton = document.querySelector('.new-group-button');
  if (newGroupButton) {
    newGroupButton.addEventListener('click', () => {
      showCreateGroupModal();
    });
  }

  // Message buttons
  const messageButtons = document.querySelectorAll('.message-button');
  messageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const buddyName = button.closest('.buddy-card').querySelector('.buddy-info h4').textContent;
      showMessageModal(buddyName);
    });
  });

  // Schedule buttons
  const scheduleButtons = document.querySelectorAll('.schedule-button');
  scheduleButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const buddyName = button.closest('.buddy-card').querySelector('.buddy-info h4').textContent;
      showScheduleModal(buddyName);
    });
  });

  // Connect buttons
  const connectButtons = document.querySelectorAll('.connect-button');
  connectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const buddyCard = button.closest('.buddy-grid-item');
      const buddyName = buddyCard.querySelector('.buddy-grid-info h4').textContent;

      // Change button text and style
      button.innerHTML = '<i class="fas fa-check"></i> Connected';
      button.classList.remove('button-outline');
      button.classList.add('button-success');
      button.style.backgroundColor = 'var(--success)';
      button.style.color = 'white';

      // Show notification
      showNotification(`Connected with ${buddyName}!`, 'success');

      // Add to current buddies section
      addToCurrentBuddies(buddyCard);
    });
  });
}

/**
 * Set up buddy cards functionality
 */
function setupBuddyCards() {
  const buddyCards = document.querySelectorAll('.buddy-card, .buddy-grid-item');

  buddyCards.forEach(card => {
    // Add hover effect
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-3px)';
      card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'none';
      card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
  });
}

/**
 * Set up chat functionality
 */
function setupChatFunctionality() {
  // Chat input functionality
  const chatInput = document.querySelector('.chat-input');
  const chatSendButton = document.querySelector('.chat-send-button');

  if (chatInput && chatSendButton) {
    // Send message on button click
    chatSendButton.addEventListener('click', () => {
      sendChatMessage();
    });

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }

  // Chat item click functionality
  const chatItems = document.querySelectorAll('.chat-item');
  chatItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all chat items
      chatItems.forEach(chat => chat.classList.remove('active'));

      // Add active class to clicked item
      item.classList.add('active');

      // Update chat header
      const chatHeader = document.querySelector('.chat-header h3');
      const chatName = item.querySelector('.chat-info h4').textContent;
      if (chatHeader) {
        chatHeader.textContent = chatName;
      }
    });
  });
}

/**
 * Set up buddy search functionality
 */
function setupBuddySearch() {
  const searchInput = document.querySelector('.search-box input');
  const filterSelects = document.querySelectorAll('.filter-select');
  const applyFiltersButton = document.querySelector('.apply-filters-button');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterBuddies();
    });
  }

  if (filterSelects) {
    filterSelects.forEach(select => {
      select.addEventListener('change', () => {
        filterBuddies();
      });
    });
  }

  if (applyFiltersButton) {
    applyFiltersButton.addEventListener('click', () => {
      filterBuddies();
      showNotification('Filters applied!', 'info');
    });
  }
}

/**
 * Filter buddies based on search and filters
 */
function filterBuddies() {
  const searchTerm = document.querySelector('.search-box input').value.toLowerCase();
  const subjectFilter = document.querySelector('.filter-section select:nth-of-type(1)').value;
  const levelFilter = document.querySelector('.filter-section select:nth-of-type(2)').value;
  const availabilityFilter = document.querySelector('.filter-section select:nth-of-type(3)').value;

  const buddyCards = document.querySelectorAll('.buddy-grid-item');

  buddyCards.forEach(card => {
    const name = card.querySelector('.buddy-grid-info h4').textContent.toLowerCase();
    const subject = card.querySelector('.tag').textContent.toLowerCase();
    const level = card.getAttribute('data-level') || '';
    const availability = card.getAttribute('data-availability') || '';

    let shouldShow = true;

    // Apply search term filter
    if (searchTerm && !name.includes(searchTerm)) {
      shouldShow = false;
    }

    // Apply subject filter
    if (subjectFilter && subjectFilter !== 'all' && !subject.includes(subjectFilter.toLowerCase())) {
      shouldShow = false;
    }

    // Apply level filter
    if (levelFilter && levelFilter !== 'all' && level !== levelFilter) {
      shouldShow = false;
    }

    // Apply availability filter
    if (availabilityFilter && availabilityFilter !== 'all' && availability !== availabilityFilter) {
      shouldShow = false;
    }

    // Show or hide card
    card.style.display = shouldShow ? 'flex' : 'none';
  });
}

/**
 * Show find buddy modal
 */
function showFindBuddyModal() {
  createModal(
    'Find Study Buddy',
    `
      <form id="find-buddy-form">
        <div class="form-group">
          <label for="buddy-subject">Course</label>
          <select id="buddy-subject" class="input">
            <option value="">Any Course</option>
            <option value="Web Dev">Web Development</option>
            <option value="Data Sc.">Data Science</option>
            <option value="App Dev">App Development</option>
            <option value="UI/UX">UI/UX Design</option>
            <option value="Excel">Microsoft Excel</option>
            <option value="Office Ess">Office Essentials</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div class="form-group">
          <label for="buddy-level">Skill Level</label>
          <select id="buddy-level" class="input">
            <option value="">Any Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
        <div class="form-group">
          <label for="buddy-availability">Availability</label>
          <select id="buddy-availability" class="input">
            <option value="">Anytime</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
          </select>
        </div>
        <div class="form-group">
          <label for="buddy-language">Language</label>
          <select id="buddy-language" class="input">
            <option value="">Any Language</option>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
            <option value="french">French</option>
            <option value="hausa">Hausa</option>
            <option value="igbo">Igbo</option>
            <option value="yoruba">Yoruba</option>
          </select>
        </div>
      </form>
    `,
    [
      {
        text: 'Cancel',
        class: 'button button-outline',
        handler: () => {
          closeModal();
        }
      },
      {
        text: 'Find Buddy',
        class: 'button button-primary',
        handler: () => {
          const form = document.getElementById('find-buddy-form');
          if (form.reportValidity()) {
            const subject = document.getElementById('buddy-subject').value;
            const level = document.getElementById('buddy-level').value;
            const availability = document.getElementById('buddy-availability').value;
            const language = document.getElementById('buddy-language').value;

            // Show success notification
            showNotification('Searching for study buddies...', 'info');

            // Simulate search
            setTimeout(() => {
              showNotification('Found 3 matching study buddies!', 'success');
              closeModal();
            }, 1500);
          }
        }
      }
    ]
  );
}

/**
 * Show create group modal
 */
function showCreateGroupModal() {
  createModal(
    'Create Study Group',
    `
      <form id="create-group-form">
        <div class="form-group">
          <label for="group-name">Group Name</label>
          <input type="text" id="group-name" class="input" placeholder="Group name" required>
        </div>
        <div class="form-group">
          <label for="group-description">Description</label>
          <textarea id="group-description" class="input" rows="3" placeholder="Group description"></textarea>
        </div>
        <div class="form-group">
          <label for="group-subject">Course</label>
          <select id="group-subject" class="input">
            <option value="">Any Course</option>
            <option value="Web Dev">Web Development</option>
            <option value="Data Sc.">Data Science</option>
            <option value="App Dev">App Development</option>
            <option value="UI/UX">UI/UX Design</option>
            <option value="Excel">Microsoft Excel</option>
            <option value="Office Ess">Office Essentials</option>
            <option value="Others">Others</option>
          </select>
            <div class="form-group">
            <label for="focus-topic">Focus Topic (Optional)</label>
            <input type="text" id="focus-topic" class="input" placeholder="Main Topic of Discussion">
        </div>
        </div>
        <div class="form-group">
          <label for="group-privacy">Privacy</label>
          <select id="group-privacy" class="input">
            <option value="public">Public</option>
            <option value="private">Private (Invite Only)</option>
          </select>
        </div>
      </form>
    `,
    [
      {
        text: 'Cancel',
        class: 'button button-outline',
        handler: () => {
          closeModal();
        }
      },
      {
        text: 'Create Group',
        class: 'button button-primary',
        handler: () => {
          const form = document.getElementById('create-group-form');
          if (form.reportValidity()) {
            const groupName = document.getElementById('group-name').value;
            const description = document.getElementById('group-description').value;
            const subject = document.getElementById('group-subject').value;
            const privacy = document.getElementById('group-privacy').value;

            // Show success notification
            showNotification('Study group created successfully!', 'success');

            // Add to current groups list
            addToCurrentGroups(groupName, subject);

            // Close modal
            closeModal();
          }
        }
      }
    ]
  );
}

/**
 * Show sort options modal
 */
function showSortOptionsModal() {
  createModal(
    'Sort Buddies',
    `
      <div class="form-group">
        <label for="sort-by">Sort By</label>
        <select id="sort-by" class="input">
          <option value="name">Name</option>
          <option value="topic">Topic</option>
          <option value="recent">Recently Added</option>
          <option value="active-days">Active Days</option>
        </select>
      </div>
      <div class="form-group">
        <label for="sort-order">Order</label>
        <select id="sort-order" class="input">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    `,
    [
      {
        text: 'Cancel',
        class: 'button button-outline',
        handler: () => {
          closeModal();
        }
      },
      {
        text: 'Apply Sort',
        class: 'button button-primary',
        handler: () => {
          const sortBy = document.getElementById('sort-by').value;
          const sortOrder = document.getElementById('sort-order').value;

          // Show success notification
          showNotification(`Buddies sorted by ${sortBy} (${sortOrder})`, 'info');

          // Close modal
          closeModal();
        }
      }
    ]
  );
}

/**
 * Show message modal
 */
function showMessageModal(buddyName) {
  createModal(
    `Message ${buddyName}`,
    `
      <div class="chat-modal">
        <div class="chat-messages">
          <!-- Messages will appear here -->
        </div>
        <div class="chat-input-container">
          <input type="text" class="chat-input" placeholder="Type your message...">
          <button class="chat-send-button">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `,
    [
      {
        text: 'Close',
        class: 'button button-outline',
        handler: () => {
          closeModal();
        }
      }
    ]
  );

  // Set up chat functionality in the modal
  setupModalChat();
}

/**
 * Show schedule modal
 */
function showScheduleModal(buddyName) {
  createModal(
    `Schedule Session with ${buddyName}`,
    `
      <form id="schedule-session-form">
        <div class="form-group">
          <label for="session-title">Session Title</label>
          <input type="text" id="session-title" class="input" placeholder="Session title" required>
        </div>
        <div class="form-group">
          <label for="session-course">Course</label>
          <select id="session-subject" class="input">
            <option value="">Any Course</option>
            <option value="Web Dev">Web Development</option>
            <option value="Data Sc.">Data Science</option>
            <option value="App Dev">App Development</option>
            <option value="UI/UX">UI/UX Design</option>
            <option value="Excel">Microsoft Excel</option>
            <option value="Office Ess">Office Essentials</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div class="form-group">
          <label for="session-date">Date & Time</label>
          <input type="datetime-local" id="session-date" class="input" required>
        </div>
        <div class="form-group">
          <label for="session-duration">Duration (minutes)</label>
          <select id="session-duration" class="input">
            <option value="30">30</option>
            <option value="60" selected>60</option>
            <option value="90">90</option>
            <option value="120">120</option>
          </select>
        </div>
      </form>
    `,
    [
      {
        text: 'Cancel',
        class: 'button button-outline',
        handler: () => {
          closeModal();
        }
      },
      {
        text: 'Schedule',
        class: 'button button-primary',
        handler: () => {
          const form = document.getElementById('schedule-session-form');
          if (form.reportValidity()) {
            const title = document.getElementById('session-title').value;
            const subject = document.getElementById('session-subject').value;
            const date = document.getElementById('session-date').value;
            const duration = document.getElementById('session-duration').value;

            // Show success notification
            showNotification('Study session scheduled successfully!', 'success');

            // Close modal
            closeModal();
          }
        }
      }
    ]
  );
}

/**
 * Create modal function
 */
function createModal(title, content, buttons = []) {
  // Remove any existing modals
  const existingModal = document.getElementById('app-modal');
  if (existingModal) {
    document.body.removeChild(existingModal);
  }

  // Create modal container
  const modal = document.createElement('div');
  modal.id = 'app-modal';
  modal.className = 'modal';

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  const modalTitle = document.createElement('h3');
  modalTitle.textContent = title;

  const closeButton = document.createElement('button');
  closeButton.className = 'modal-close';
  closeButton.innerHTML = '<i class="fas fa-times"></i>';
  closeButton.addEventListener('click', () => {
    closeModal();
  });

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  // Create modal body
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';
  modalBody.innerHTML = content;

  // Create modal footer
  const modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';

  // Add buttons to footer
  buttons.forEach(button => {
    const btn = document.createElement('button');
    btn.className = button.class || 'button';
    btn.textContent = button.text;
    btn.addEventListener('click', button.handler || (() => {}));
    modalFooter.appendChild(btn);
  });

  // Assemble modal
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  return modal;
}

/**
 * Close the current modal
 */
function closeModal() {
  const modal = document.getElementById('app-modal');
  if (modal) {
    document.body.removeChild(modal);
  }
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  // Remove any existing notifications
  const existingNotification = document.getElementById('app-notification');
  if (existingNotification) {
    document.body.removeChild(existingNotification);
  }

  const notification = document.createElement('div');
  notification.id = 'app-notification';
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
}

/**
 * Add to current buddies section
 */
function addToCurrentBuddies(buddyCard) {
  const currentBuddiesSection = document.querySelector('.buddies-section');
  if (currentBuddiesSection) {
    // Clone the buddy card
    const newBuddyCard = buddyCard.cloneNode(true);

    // Remove the connect button
    const connectButton = newBuddyCard.querySelector('.connect-button');
    if (connectButton) {
      connectButton.remove();
    }

    // Add message and schedule buttons
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'buddy-actions';
    actionsDiv.innerHTML = `
      <button class="button button-outline message-button">
        <i class="fas fa-comment"></i> Message
      </button>
      <button class="button button-primary schedule-button">
        <i class="fas fa-calendar-plus"></i> Schedule
      </button>
    `;

    // Replace the existing actions with new ones
    const existingActions = newBuddyCard.querySelector('.buddy-actions');
    if (existingActions) {
      existingActions.replaceWith(actionsDiv);
    }

    // Add to current buddies section
    currentBuddiesSection.insertBefore(newBuddyCard, currentBuddiesSection.firstChild);

    // Set up the new buttons
    setupActionButtons();
  }
}

/**
 * Add to current groups list
 */
function addToCurrentGroups(name, subject) {
  const currentGroupsList = document.querySelector('.group-list');
  if (currentGroupsList) {
    const groupItem = document.createElement('div');
    groupItem.className = 'group-item active';
    groupItem.innerHTML = `
      <i class="fas fa-users"></i>
      <span>${name}</span>
    `;

    currentGroupsList.insertBefore(groupItem, currentGroupsList.firstChild);
  }
}

/**
 * Set up chat functionality in modal
 */
function setupModalChat() {
  const chatInput = document.querySelector('#app-modal .chat-input');
  const chatSendButton = document.querySelector('#app-modal .chat-send-button');
  const chatMessages = document.querySelector('#app-modal .chat-messages');

  if (chatInput && chatSendButton && chatMessages) {
    // Send message on button click
    chatSendButton.addEventListener('click', () => {
      sendChatMessage(chatInput, chatMessages);
    });

    // Send message on Enter key
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage(chatInput, chatMessages);
      }
    });
  }
}

/**
 * Send chat message
 */
function sendChatMessage(chatInput, chatMessages) {
  const message = chatInput.value.trim();
  if (message) {
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'chat-message sent';
    messageElement.innerHTML = `
      <div class="message-content">
        <p>${message}</p>
      </div>
      <div class="message-time">Just now</div>
    `;

    // Add to chat messages
    chatMessages.appendChild(messageElement);

    // Clear input
    chatInput.value = '';

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Simulate reply after delay
    setTimeout(() => {
      const replyElement = document.createElement('div');
      replyElement.className = 'chat-message received';
      replyElement.innerHTML = `
        <div class="message-content">
          <p>Thanks for your message! I'll get back to you soon.</p>
        </div>
        <div class="message-time">Just now</div>
      `;
      chatMessages.appendChild(replyElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
  }
}

/**
 * Send chat message in main chat
 */
function sendChatMessage() {
  const chatInput = document.querySelector('.chat-input');
  const chatMessages = document.querySelector('.chat-messages');

  if (chatInput && chatMessages) {
    const message = chatInput.value.trim();
    if (message) {
      // Create message element
      const messageElement = document.createElement('div');
      messageElement.className = 'chat-message sent';
      messageElement.innerHTML = `
        <div class="message-content">
          <p>${message}</p>
        </div>
        <div class="message-time">Just now</div>
      `;

      // Add to chat messages
      chatMessages.appendChild(messageElement);

      // Clear input
      chatInput.value = '';

      // Scroll to bottom
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate reply after delay
      setTimeout(() => {
        const replyElement = document.createElement('div');
        replyElement.className = 'chat-message received';
        replyElement.innerHTML = `
          <div class="message-content">
            <p>Thanks for your message! I'll get back to you soon.</p>
          </div>
          <div class="message-time">Just now</div>
        `;
        chatMessages.appendChild(replyElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 1000);
    }
  }
}

/**
 * Set up real-time features
 */
function setupRealTimeFeatures() {
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
      showNotification(randomMessage, randomType);
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
          showNotification('Level up! You reached a new level!', 'success');
          setTimeout(() => {
            xpFill.style.width = '0%';
            const levelBadge = document.querySelector('.level-badge');
            if (levelBadge) {
              const currentLevel = parseInt(levelBadge.textContent.replace('Lvl ', ''));
              levelBadge.textContent = `Lvl ${currentLevel + 1}`;
            }
          }, 3000);
        }
      }
    }
  }, 10000); // Check every 10 seconds

  // Simulate study buddy suggestions
  const buddyCardsContainer = document.querySelector('.buddy-grid');
  if (buddyCardsContainer) {
    setInterval(() => {
      const randomBuddy = {
        name: ['Michael Chen', 'Emily Davis', 'James Wilson', 'Sophia Martinez'][Math.floor(Math.random() * 4)],
        university: ['Harvard University', 'Stanford University', 'MIT', 'University of Texas'][Math.floor(Math.random() * 4)],
        subjects: ['Python', 'Machine Learning', 'Algorithms', 'Data Science', 'Web Development'][Math.floor(Math.random() * 5)],
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg`
      };

      const buddyCard = document.createElement('div');
      buddyCard.className = 'buddy-grid-item fade-in';
      buddyCard.setAttribute('data-level', ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)]);
      buddyCard.setAttribute('data-availability', ['morning', 'afternoon', 'evening'][Math.floor(Math.random() * 3)]);
      buddyCard.innerHTML = `
        <img src="${randomBuddy.avatar}" alt="Buddy" class="buddy-avatar">
        <div class="buddy-grid-info">
          <h4>${randomBuddy.name}</h4>
          <p>${randomBuddy.university}</p>
        </div>
        <div class="buddy-grid-tags">
          <span class="tag">${randomBuddy.subjects}</span>
        </div>
        <button class="button button-outline connect-button">
          <i class="fas fa-user-plus"></i> Connect
        </button>
      `;

      // Add to the study buddy section
      buddyCardsContainer.insertBefore(buddyCard, buddyCardsContainer.firstChild);
      showNotification(`New study buddy suggestion: ${randomBuddy.name}`, 'info');

      // Set up the new connect button
      const connectButton = buddyCard.querySelector('.connect-button');
      if (connectButton) {
        connectButton.addEventListener('click', (e) => {
          e.preventDefault();
          const buddyName = buddyCard.querySelector('.buddy-grid-info h4').textContent;

          // Change button text and style
          connectButton.innerHTML = '<i class="fas fa-check"></i> Connected';
          connectButton.classList.remove('button-outline');
          connectButton.classList.add('button-success');
          connectButton.style.backgroundColor = 'var(--success)';
          connectButton.style.color = 'white';

          // Show notification
          showNotification(`Connected with ${buddyName}!`, 'success');

          // Add to current buddies section
          addToCurrentBuddies(buddyCard);
        });
      }
    }, 30000); // Add new buddy every 30 seconds
  }
}
