const constantDivs = document.querySelectorAll('.constant div');
        
        constantDivs.forEach(div => {
            div.addEventListener('click', () => {
                div.classList.toggle('clicked');
            });
        });