(function () {
    function getURLParameter(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, null])[1].replace(/\+/g, '%20')) || null;
    }

    function clickCheckbox(checkoutPageId, pid) {
        let checkbox = document.querySelector(`input#checkbox-cone-step-order-${checkoutPageId}-${pid}`);
        if (checkbox) {
            checkbox.click();
        } else {
            console.log(`Checkbox not found for checkoutPageId: ${checkoutPageId}, pid: ${pid}`);
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
        let checkoutPageId = getURLParameter("checkoutPageId");
        let pid = getURLParameter("pid");
        
        if (checkoutPageId && pid && pid !== "null") {
            clickCheckbox(checkoutPageId, pid);
        } else {
            console.log("Checkout page ID or PID is null or undefined");
        }
    });
})();
