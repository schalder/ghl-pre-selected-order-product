// main.js

(function () {
    function getDynamicValue() {
        // You can modify this to fetch the dynamic value from a global variable or function
        // Example: Return a global variable or call a function that users can define in their HTML
        if (typeof getDynamicValueFromHTML === 'function') {
            return getDynamicValueFromHTML();
        } else {
            console.error('getDynamicValueFromHTML function is not defined.');
            return null;
        }
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, null])[1].replace(/\+/g, '%20')) || null;
    }

    function clickCheckbox(pid) {
        let dynamicValue = getDynamicValue();
        let checkbox = document.querySelector(`input#checkbox-cone-step-order-${dynamicValue}-${pid}`);
        if (checkbox) {
            checkbox.click();
        } else {
            console.log("Checkbox not found for pid:", pid);
        }
    }

    function waitForFormPayment(callback) {
        let observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    callback();
                }
            });
        });

        observer.observe(document.body, { 
            childList: true, 
            subtree: true 
        });
    }

    waitForFormPayment(function() {
        let pid = getURLParameter("pid");
        console.log("pid:", pid);
        if (pid && pid !== "null") {
            clickCheckbox(pid);
        } else {
            console.log("pid is null or undefined");
        }
    });
})();
