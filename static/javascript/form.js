// function updateLinks(){
//     const div=document.querySelectorAll('.app-sidebar-link');
//     Array.from(div).forEach(element=>{
//         element.classList.remove('active');
//     });
//     div[1].classList.add('active');
// }
// updateLinks();


async function submitForm(){
    var set=new Object();
    
    // set.addiction=document.getElementById('addiction')
    
    let height=document.getElementById('height').value;
    let weight=document.getElementById('weight').value;
    set.bmi=(weight)/(height*height);
    set.bod=parseInt(document.getElementById('BOD').value);
    set.bloodPressure=parseInt(document.getElementById('blood-pressure').value);
    set.cholesterol=parseInt(document.getElementById('cholesterol').value);
    set.addiction=document.getElementById('flexSwitchCheckDefault').checked;
    set.workoutTime=parseInt(document.getElementById('workoutTime').value);
    // console.log(set);
    // flexSwitchCheckDefault
    let loaderDiv=document.getElementById('loader-submit');
    loaderDiv.innerHTML=`<div class="loader"></div>`;
    // console.log(set);
    // // let temp=new Array;
    // let multipleOptionSelect = document.querySelector('select[multiple]');
    // let selectedAddiction=new Array;
    // Array.from(multipleOptionSelect).forEach(item=>{
    //     // console.log(item);
    //     if(item.selected==true)
    //     {
    //         set.addiction=item.value;
    //         selectedAddiction.push(item.value);
    //         // console.log(item.value);
    //         // temp.push(item.value);
    //         // console.log("hi");
    //         // i++;
    //     }
    // })
    // // set.push(temp)
    // set.addiction=selectedAddiction;
    // console.log(selectedAddiction);
    console.log(set);
    await fetch('/user/dashboard/form',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(set)
    })
    window.location.href='/user/dashboard';
}


let multipleOptionSelect = document.querySelectorAll('select[multiple]');
if (multipleOptionSelect.length > 0) {
    let multidatai = 1;
    multipleOptionSelect.forEach(select => {
        let multipleOptionSelectWrapper = document.createElement('div');
        multipleOptionSelectWrapper.classList.add('multi-data-selector');
        select.style.width = "100%";
        select.parentNode.insertBefore(multipleOptionSelectWrapper, select);
        multipleOptionSelectWrapper.appendChild(select);

        let multipleSelector = document.createElement('div');
        multipleSelector.classList.add('multiple-selector');
        multipleOptionSelectWrapper.appendChild(multipleSelector);

        let multipleSelectorData = document.createElement('div');
        multipleSelectorData.classList.add('multiple-selector-data');
        multipleSelector.appendChild(multipleSelectorData);

        let multipleSelectorAutoSuggestInsert = document.createElement('div');
        multipleSelectorAutoSuggestInsert.classList.add('multi-auto-suggested-data');
        multipleSelectorData.appendChild(multipleSelectorAutoSuggestInsert);

        let multipleSelectorAutoSuggest = document.createElement('input');
        multipleSelectorAutoSuggest.setAttribute('type', 'text');
        multipleSelectorAutoSuggest.setAttribute('placeholder', 'Start typing...');
        multipleSelectorAutoSuggest.setAttribute('list', 'multiSelectorAutoSuggest' + multidatai);
        multipleSelectorData.appendChild(multipleSelectorAutoSuggest);

        let multipleSelectorOptionsDataList = document.createElement('datalist');
        multipleSelectorOptionsDataList.setAttribute('id', 'multiSelectorAutoSuggest' + multidatai);
        multipleSelector.appendChild(multipleSelectorOptionsDataList);

        let multipleSelectorOptionValue = "";
        for (let i = 0; i < select.children.length; i++) {
            multipleSelectorOptionValue = select.children[i].value + ',';

            let multipleSelectorOptionElementDataList = document.createElement('option');
            multipleSelectorOptionElementDataList.innerHTML = multipleSelectorOptionValue;
            multipleSelectorOptionsDataList.appendChild(multipleSelectorOptionElementDataList);
        }
        multidatai++;
    });
}

let multiSelectorAutoSuggestInput = document.querySelectorAll('.multiple-selector input[list]');
if (multiSelectorAutoSuggestInput.length > 0) {
    multiSelectorAutoSuggestInput.forEach(autoSuggestInput => {
        autoSuggestInput.addEventListener('keyup', function (e) {
            // console.log(this.value.match(/[,\/]/g))
            if (this.value.match(/[,]/g)) {
                let thisCommaCleanedValue = this.value.replace(/[,]/g, '');
                let multipleSelectorOptionElementAutoSuggestSpan = document.createElement('span');
                multipleSelectorOptionElementAutoSuggestSpan.classList.add('multiple-selector-option');
                multipleSelectorOptionElementAutoSuggestSpan.innerHTML = thisCommaCleanedValue;

                let alreadyMultiDataListed = this.previousSibling,
                    alreadyMultiDataListedArray = [];

                if (alreadyMultiDataListed.children.length > 0) {
                    for (let k = 0; k < alreadyMultiDataListed.children.length; k++) {
                        alreadyMultiDataListedArray.push(alreadyMultiDataListed.children[k].textContent);
                    }
                } else {
                    this.parentElement.children[0].appendChild(multipleSelectorOptionElementAutoSuggestSpan);
                }

                if (!alreadyMultiDataListedArray.includes(thisCommaCleanedValue)) {
                    this.parentElement.children[0].appendChild(multipleSelectorOptionElementAutoSuggestSpan);
                }

                let multiDataOptionAddRemover = document.createElement('span');
                multiDataOptionAddRemover.classList.add('option-data-selected-remover');
                multipleSelectorOptionElementAutoSuggestSpan.appendChild(multiDataOptionAddRemover);

                this.value = "";


                // console.log(this.parentNode.parentNode.previousSibling);
                let multipleOptionSelectCollection = this.parentNode.parentNode.previousSibling;
                for (let j = 0; j < multipleOptionSelectCollection.children.length; j++) {
                    if (multipleOptionSelectCollection.children[j].textContent == thisCommaCleanedValue) {
                        multipleOptionSelectCollection.children[j].setAttribute('selected', 'selected');
                    }
                }

                optionDataSelectedRemoverActFunc();

                /* Checking selected data are applied or not ! */
                function getSelectValues(select) {
                    var result = [];
                    var options = select && select.options;
                    var opt;

                    for (var i = 0, iLen = options.length; i < iLen; i++) {
                        opt = options[i];

                        if (opt.selected) {
                            result.push(opt.value || opt.text);
                        }
                    }
                    return result;
                }


                let checkAllMultiData = document.querySelectorAll('select[multiple]');
                if (checkAllMultiData.length > 0) {
                    checkAllMultiData.forEach(checkMultiData => {
                        // console.log(getSelectValues(checkMultiData));
                    });
                }
                /* ends Data Cheking */
            }
        });
    });
}

let multiDataSelectorWrapper = document.querySelectorAll('.multi-data-selector');
if (multiDataSelectorWrapper.length > 0) {
    multiDataSelectorWrapper.forEach(mdsWrapper => {
        mdsWrapper.addEventListener('click', function (e) {
            this.children[1].children[0].children[1].focus();
        });
    });
}

let optionDataSelectedRemoverActFunc = (e) => {
    let optionDataSelectedRemoverAct = document.querySelectorAll('.option-data-selected-remover');
    if (optionDataSelectedRemoverAct.length > 0) {
        optionDataSelectedRemoverAct.forEach(optionRemoverAct => {
            optionRemoverAct.addEventListener('click', function (e) {

                let multipleOptionSelectCollection = this.parentNode.parentNode.parentNode.parentNode.previousSibling;
                for (let j = 0; j < multipleOptionSelectCollection.children.length; j++) {
                    if (multipleOptionSelectCollection.children[j].textContent == this.parentNode.textContent) {
                        multipleOptionSelectCollection.children[j].removeAttribute('selected');
                    }
                }

                setTimeout(function (e) {
                    optionRemoverAct.parentElement.remove();
                }, 100)
            });
        });
    }
}

optionDataSelectedRemoverActFunc();