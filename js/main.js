$(document).ready(function () {
    /*nav animation*/
    $(document).ready(function () {
        $('nav> ul>li').mouseover(function () {
            $(this).find('ul').stop().slideDown(500)
        })
        $('nav> ul>li').mouseout(function () {
            $(this).find('ul').stop().slideUp(500)
        })
    })
    /*side_bar*/
    $('.menu_btn').click(function () {
        $('.side_bar').show()
    })
    $('.close_btn').click(function () {
        $('.side_bar').hide()
    })
    /*visual text animation*/
    var typingBool = false;
    var typingIdx = 0;
    var liIndex = 0;
    var liLength = $(".typing-txt>ul>li").length;

    // 타이핑될 텍스트를 가져온다 
    var typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();
    typingTxt = typingTxt.split(""); // 한글자씩 자른다. 
    if (typingBool == false) { // 타이핑이 진행되지 않았다면 
        typingBool = true;
        var tyInt = setInterval(typing, 100); // 반복동작 
    }

    function typing() {
        if (typingIdx < typingTxt.length) { // 타이핑될 텍스트 길이만큼 반복 
            $(".typing").append(typingTxt[typingIdx]); // 한글자씩 이어준다. 
            typingIdx++;
        } else { //한문장이끝나면
            //다음문장으로.. 마지막문장이면 다시 첫번째 문장으로 
            if (liIndex >= liLength - 1) {
                liIndex = 0;
            } else {
                liIndex++;
            }

            //다음문장을 타이핑하기위한 셋팅
            typingIdx = 0;
            typingBool = false;
            typingTxt = $(".typing-txt>ul>li").eq(liIndex).text();

            //다음문장 타이핑전 1초 쉰다
            clearInterval(tyInt);
            setTimeout(function () {
                $(".typing").html('');
                tyInt = setInterval(typing, 100);
            }, 3000);
        }
    }

    /*product animation*/
    // Data for the sections
    let h1Texts = ["ZERO", "CHERRY", "LEMON"]; // Add your h1 texts here
    let logoColors = [
        "var(--lemon-logo)",
        "var(--cherry-logo)",
        "var(--zero-logo)"
    ]; // Add your logo colors here
    let keyframes = ["wave-lemon-effect", "wave-cherry-effect", "wave-zero-effect"]; // Add your keyframes here
    // Normal GSAP animation.......
    gsap.from(".fruit-image ", { y: "-100vh", delay: 0.1 });
    gsap.to(".fruit-image img", {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        zIndex: 22,
        duration: 1,
        ease: "none",
        yoyo: true,
        repeat: -1
    });

    // get the elements
    const waveEffect = document.querySelector(".wave");
    const sections = document.querySelectorAll(".section");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const caneLabels = document.querySelector(".cane-labels");
    const sectionContainer = document.querySelector(".section-container");
    // Set index and current position
    let index = 0;
    let currentIndex = 0;
    let currentPosition = 0;

    // Add event listeners to the buttons
    nextButton.addEventListener("click", () => {
        // Decrease the current position by 100% (to the left)
        if (currentPosition > -200) {
            currentPosition -= 100;
            // Update the left position of the cane-labels
            caneLabels.style.left = `${currentPosition}%`;
            sectionContainer.style.left = `${currentPosition}%`;
        }
        // Increment index and currentIndex
        currentIndex++;
        // Update the h1 text if currentIndex is less than the length of h1Texts
        if (currentIndex < h1Texts.length) {
            document.querySelector(".h1").innerHTML = h1Texts[currentIndex];
        }
        // Gasp animation for next section components
        gsap.to(".logo", {
            opacity: 1,
            duration: 1,
            color: logoColors[currentIndex]
        });
        gsap.from(".h1", { y: "20%", opacity: 0, duration: 0.5 });
        gsap.from(".fruit-image ", { y: "-100vh", delay: 0.4, duration: 0.4 });

        // Disable the nextButton if the last section is active
        if (currentIndex === h1Texts.length - 1) {
            nextButton.style.display = "none";
        }
        // Enable the prevButton if it's not the first section
        if (currentIndex > 0) {
            prevButton.style.display = "block";
        }
        // Button colors and animations
        nextButton.style.color = logoColors[currentIndex + 1];
        prevButton.style.color = logoColors[currentIndex - 1];
        nextButton.style.animationName = keyframes[currentIndex + 1];
        prevButton.style.animationName = keyframes[currentIndex - 1];
    });
    // Add event listeners to the buttons
    prevButton.addEventListener("click", () => {
        if (currentPosition < 0) {
            currentPosition += 100;
            // Update the left position of the cane-labels
            caneLabels.style.left = `${currentPosition}%`;
            sectionContainer.style.left = `${currentPosition}%`;
            sectionContainer.style.transition = `all 0.5s ease-in-out`;
        }
        // Decrement index and currentIndex
        currentIndex--;
        if (currentIndex >= 0) {
            document.querySelector(".h1").innerHTML = h1Texts[currentIndex];
        }
        // Gasp animation for previous section components
        gsap.to(".logo", { color: logoColors[currentIndex], duration: 1 });
        gsap.from(".h1", { y: "20%", opacity: 0, duration: 0.5 });
        gsap.from(".fruit-image ", { y: "100vh", delay: 0.5 });
        // Enable the nextButton if it was disabled
        nextButton.style.display = "block";
        // Disable the prevButton if it's the first section
        if (currentIndex === 0) {
            prevButton.style.display = "none";
        }
        // Button colors and animations
        nextButton.style.color = logoColors[currentIndex + 1];
        prevButton.style.color = logoColors[currentIndex - 1];
        nextButton.style.animationName = keyframes[currentIndex + 1];
        prevButton.style.animationName = keyframes[currentIndex - 1];
    });

})


