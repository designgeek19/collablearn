// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navLinks = document.querySelectorAll('.nav-links a');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const postOptions = document.querySelectorAll('.post-option');
    const createPostBtn = document.querySelector('.create-post-button');
    const timerButtons = document.querySelectorAll('.timer-controls button');
    const pomodoroOptions = document.querySelectorAll('.pomodoro-options button');
    const likeButtons = document.querySelectorAll('.post-actions .button-outline:first-child');
    const joinButtons = document.querySelectorAll('.study-session .button-outline');
    const connectButtons = document.querySelectorAll('.buddy-actions .button-outline');
    const messageButtons = document.querySelectorAll('.buddy-actions .button-secondary');
    const mobileNavToggle = document.createElement('button');
    const modalContainer = document.getElementById('modal-container');
    const notificationContainer = document.getElementById('notification-container');
    
    // Mobile Navigation Setup
    mobileNavToggle.className = 'mobile-nav-toggle';
    mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar .container').appendChild(mobileNavToggle);
    
    // Variables
    let timerInterval;
    let timerDuration = 25 * 60; // 25 minutes in seconds
    let timerRemaining = timerDuration;
    
    // Initialize UI
    initUI();
    
    // Initialize UI Function
    function initUI() {
        // Set initial active tab
        setActiveTab('posts');
        
        // Initialize fade-in animations
        initFadeAnimations();
        
        // Initialize study timer display
        updateTimerDisplay();
    }
    
    // Initialize Fade Animations
    function initFadeAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        setTimeout(() => {
            fadeElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100 * index);
            });
        }, 300);
    }
    
    // Navigation Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            // In a real app, this would load the selected section
        });
    });
    
    // Tab Switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            setActiveTab(tabId);
        });
    });
    
    // Set Active Tab
    function setActiveTab(tabId) {
        // Update tab buttons
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.getAttribute('data-tab') === tabId);
        });
        
        // Update tab contents
        tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabId);
        });
    }
    
    // Post Option Event Listeners
    postOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.getAttribute('data-action');
            openModal(action);
        });
    });
    
    // Create Post Button
    if (createPostBtn) {
        createPostBtn.addEventListener('click', function() {
            openModal('create-post');
        });
    }
    
    // Timer Controls
    timerButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.classList[2];
            
            switch(action) {
                case 'start-timer':
                    startTimer();
                    break;
                case 'pause-timer':
                    pauseTimer();
                    break;
                case 'reset-timer':
                    resetTimer();
                    break;
            }
        });
    });
    
    // Pomodoro Options
    pomodoroOptions.forEach(option => {
        option.addEventListener('click', function() {
            pomodoroOptions.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const duration = parseInt(this.getAttribute('data-duration'));
            timerDuration = duration * 60;
            timerRemaining = timerDuration;
            updateTimerDisplay();
        });
    });
    
    // Like Buttons
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const countSpan = this.querySelector('.count');
            let count = parseInt(countSpan.textContent);
            
            if (this.classList.contains('liked')) {
                count--;
                this.classList.remove('liked');
                this.innerHTML = '<i class="fas fa-thumbs-up"></i> Like <span class="count">' + count + '</span>';
            } else {
                count++;
                this.classList.add('liked');
                this.innerHTML = '<i class="fas fa-thumbs-up" style="color:#4361ee"></i> Liked <span class="count">' + count + '</span>';
            }
        });
    });
    
    // Join Study Session Buttons
    joinButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sessionTitle = this.closest('.study-session').querySelector('h4').textContent;
            showNotification(`Joining "${sessionTitle}" study session...`);
            
            // Simulate joining after a delay
            setTimeout(() => {
                showNotification(`Successfully joined "${sessionTitle}" session!`, 'success');
            }, 1500);
        });
    });
    
    // Connect Buttons
    connectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buddyName = this.closest('.buddy-card').querySelector('h4').textContent;
            this.disabled = true;
            this.textContent = 'Pending';
            showNotification(`Connection request sent to ${buddyName}`);
        });
    });
    
    // Message Buttons
    messageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buddyName = this.closest('.buddy-card').querySelector('h4').textContent;
            openModal('message', buddyName);
        });
    });
    
    // Mobile Navigation Toggle
    mobileNavToggle.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Timer Functions
    function startTimer() {
        if (timerInterval) return;
        
        timerInterval = setInterval(() => {
            timerRemaining--;
            updateTimerDisplay();
            
            if (timerRemaining <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                showNotification("Time's up! Take a break.", 'success');
                document.querySelector('.timer-display').classList.add('finished');
            }
        }, 1000);
    }
    
    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        timerRemaining = timerDuration;
        updateTimerDisplay();
        document.querySelector('.timer-display').classList.remove('finished');
    }
    
    function updateTimerDisplay() {
        const minutes = Math.floor(timerRemaining / 60);
        const seconds = timerRemaining % 60;
        document.querySelector('.timer-display').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Modal Functions
    function openModal(type, buddyName = '') {
        // Clear previous modal
        modalContainer.innerHTML = '';
        
        let modalContent = '';
        let modalTitle = '';
        
        switch(type) {
            case 'create-post':
                modalTitle = 'Create New Post';
                modalContent = `
                    <div class="modal-body">
                        <textarea placeholder="Share what you're learning..." class="post-input"></textarea>
                        <div class="modal-actions">
                            <button class="button button-outline cancel-modal">Cancel</button>
                            <button class="button button-primary submit-post">Post</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'schedule-study':
                modalTitle = 'Schedule Study Session';
                modalContent = `
                    <div class="modal-body">
                        <input type="text" placeholder="Session Title" class="modal-input">
                        <textarea placeholder="Description..." class="modal-input"></textarea>
                        <input type="datetime-local" class="modal-input">
                        <div class="modal-actions">
                            <button class="button button-outline cancel-modal">Cancel</button>
                            <button class="button button-primary schedule-session">Schedule</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'find-buddy':
                modalTitle = 'Find Study Buddy';
                modalContent = `
                    <div class="modal-body">
                        <input type="text" placeholder="Search by subject or interest..." class="modal-input">
                        <div class="buddy-filters">
                            <h4>Filters</h4>
                            <div class="filter-options">
                                <label><input type="checkbox"> Computer Science</label>
                                <label><input type="checkbox"> Mathematics</label>
                                <label><input type="checkbox"> Biology</label>
                                <label><input type="checkbox"> Engineering</label>
                            </div>
                        </div>
                        <div class="modal-actions">
                            <button class="button button-outline cancel-modal">Cancel</button>
                            <button class="button button-primary find-buddies">Find Buddies</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'ask-question':
                modalTitle = 'Ask a Question';
                modalContent = `
                    <div class="modal-body">
                        <input type="text" placeholder="Question title..." class="modal-input">
                        <textarea placeholder="Provide details about your question..." class="modal-input"></textarea>
                        <div class="tags-input">
                            <input type="text" placeholder="Add tags (e.g. #Python #Algorithms)" class="modal-input">
                        </div>
                        <div class="modal-actions">
                            <button class="button button-outline cancel-modal">Cancel</button>
                            <button class="button button-primary ask-question">Ask</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'message':
                modalTitle = `Message ${buddyName}`;
                modalContent = `
                    <div class="modal-body">
                        <div class="chat-window">
                            <div class="message received">
                                <p>Hi there! I saw your profile and thought we could study together. What subjects are you focusing on?</p>
                            </div>
                        </div>
                        <div class="message-input">
                            <input type="text" placeholder="Type your message...">
                            <button class="button button-primary send-message">Send</button>
                        </div>
                    </div>
                `;
                break;
        }
        
        const modalHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${modalTitle}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                ${modalContent}
            </div>
        `;
        
        modalContainer.innerHTML = modalHTML;
        modalContainer.style.display = 'flex';
        
        // Add event listeners to modal buttons
        modalContainer.querySelector('.close-modal').addEventListener('click', closeModal);
        modalContainer.querySelector('.cancel-modal')?.addEventListener('click', closeModal);
        
        // Handle form submissions
        const submitBtn = modalContainer.querySelector('.button-primary');
        if (submitBtn) {
            submitBtn.addEventListener('click', function() {
                handleModalSubmit(type);
            });
        }
    }
    
    function closeModal() {
        modalContainer.style.display = 'none';
    }
    
    function handleModalSubmit(type) {
        switch(type) {
            case 'create-post':
                const postContent = document.querySelector('.post-input').value;
                if (postContent.trim()) {
                    showNotification('Post created successfully!', 'success');
                    closeModal();
                } else {
                    showNotification('Please write something to post.', 'error');
                }
                break;
                
            case 'schedule-study':
                showNotification('Study session scheduled!', 'success');
                closeModal();
                break;
                
            case 'find-buddy':
                showNotification('Finding study buddies...', 'info');
                // Simulate finding buddies
                setTimeout(() => {
                    closeModal();
                    showNotification('3 potential study buddies found!', 'success');
                }, 2000);
                break;
                
            case 'ask-question':
                showNotification('Question posted successfully!', 'success');
                closeModal();
                break;
                
            case 'message':
                const message = document.querySelector('.message-input input').value;
                if (message.trim()) {
                    const chatWindow = document.querySelector('.chat-window');
                    const newMessage = document.createElement('div');
                    newMessage.className = 'message sent';
                    newMessage.innerHTML = `<p>${message}</p>`;
                    chatWindow.appendChild(newMessage);
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                    document.querySelector('.message-input input').value = '';
                }
                break;
        }
    }
    
    // Notification Function
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Close modal when clicking outside
    modalContainer.addEventListener('click', function(e) {
        if (e.target === modalContainer) {
            closeModal();
        }
    });
    
    // Prevent clicks inside modal from closing it
    modalContainer.querySelector('.modal')?.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});
