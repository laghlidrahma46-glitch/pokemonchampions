document.addEventListener('DOMContentLoaded', () => {
    const claimBtn = document.getElementById('claim-btn');
    const overlay = document.getElementById('loading-overlay');
    
    // Steps
    const stepUsername = document.getElementById('step-username');
    const stepLoading = document.getElementById('step-loading');
    const stepVerification = document.getElementById('step-verification');
    
    // Elements
    const connectBtn = document.getElementById('connect-btn');
    const trainerIdInput = document.getElementById('trainer-id');
    const trainerError = document.getElementById('trainer-error');
    
    const progressBar = document.getElementById('progress-bar');
    const modalStatus = document.getElementById('modal-status');
    const modalSubtext = document.getElementById('modal-subtext');
    const verifyBtn = document.getElementById('verify-btn');

    let trainerId = "";

    // Messages to cycle through during the loading phase
    const loadingMessages = [
        { status: "Connecting to Server...", subtext: "Establishing secure connection", progress: 15 },
        { status: "Locating Trainer ID...", subtext: "Searching database for account", progress: 40 },
        { status: "Authenticating Request...", subtext: "Checking slot availability", progress: 60 },
        { status: "Generating Battle Pass...", subtext: "Injecting rewards into profile", progress: 85 },
        { status: "Finalizing...", subtext: "Preparing verification module", progress: 95 }
    ];

    claimBtn.addEventListener('click', () => {
        // Show the modal and Step 1
        overlay.classList.remove('hidden');
        stepUsername.classList.add('active');
        stepUsername.classList.remove('hidden');
        stepLoading.classList.remove('active');
        stepLoading.classList.add('hidden');
        stepVerification.classList.remove('active');
        stepVerification.classList.add('hidden');
        
        // Focus the input
        setTimeout(() => trainerIdInput.focus(), 100);
    });
    
    connectBtn.addEventListener('click', () => {
        const val = trainerIdInput.value.trim();
        if (val.length < 3) {
            trainerError.classList.remove('hidden');
            trainerIdInput.style.borderColor = '#ef4444';
            return;
        }
        
        trainerError.classList.add('hidden');
        trainerIdInput.style.borderColor = 'var(--glass-border)';
        trainerId = val;
        
        // Update second message dynamically
        loadingMessages[1].subtext = `Searching database for ${trainerId}`;
        
        // Hide username step, show loading step
        stepUsername.classList.remove('active');
        stepUsername.classList.add('hidden');
        
        stepLoading.classList.remove('hidden');
        stepLoading.classList.add('active');
        
        startLoadingProcess();
    });

    function startLoadingProcess() {
        let messageIndex = 0;
        
        // Function to update loading state
        const updateLoadingState = () => {
            if (messageIndex < loadingMessages.length) {
                const msg = loadingMessages[messageIndex];
                modalStatus.textContent = msg.status;
                modalSubtext.textContent = msg.subtext;
                progressBar.style.width = `${msg.progress}%`;
                messageIndex++;
                
                // Random delay between 600ms and 1000ms
                const delay = Math.floor(Math.random() * 400) + 600;
                setTimeout(updateLoadingState, delay);
            } else {
                // Complete the progress bar
                progressBar.style.width = '100%';
                
                // Wait briefly, then show verification step
                setTimeout(() => {
                    stepLoading.classList.remove('active');
                    stepLoading.classList.add('hidden');
                    
                    // Small delay before showing verification to allow transition
                    setTimeout(() => {
                        stepVerification.classList.remove('hidden');
                        stepVerification.classList.add('active');
                    }, 50);
                }, 500);
            }
        };

        // Start the simulated loading process
        setTimeout(updateLoadingState, 500);
    }

    // Redirect to CPA Network Locker
    function openContentLocker() {
        console.log("Redirecting to Locker for Trainer:", trainerId);
        // Replace this URL with your actual locker link
        window.location.href = "https://luuna.site/cl/i/7jd4pg";
    }

    // Trigger verification
    verifyBtn.addEventListener('click', () => {
        // Add a slight click effect
        verifyBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            verifyBtn.style.transform = 'scale(1)';
            openContentLocker();
        }, 150);
    });
});
