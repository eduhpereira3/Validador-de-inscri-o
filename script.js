let a1validator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        a1validator.clearErrors()

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check =  a1validator.checkInput(input);
            if(check !== true){
                send = false;
                a1validator.showError(input, check);

            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
           rules = rules.split('|');
           for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo obrigatório';
                        }

                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            return 'São necessários '+rDetails[1]' caracteres no mínimo ';
                        }

                    break;
                    case 'email':

                }
           }

        }
        
        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = "#FF0000";

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);

    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++) {
            inputs [i].style = '';
        }


        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++) { 
            errorElements[i].remove();
        }

    }
};

let form = document.querySelector('.a1validator');
form.addEventListener('submit',a1validator.handleSubmit);