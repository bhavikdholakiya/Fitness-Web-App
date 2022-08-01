
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