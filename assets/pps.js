(() => {
    (async function() {
      let enabled = true;
      if (!enabled)
        return;
      let survey = {
        qId: "4",
        type: "text",
        question: "Quick Question: Was there anything that almost prevented you from completing your purchase today?",
        desc: "Any unanswered questions, or unaddressed concerns?",
        textInputPlaceholder: "Just Let us know here",
        textInputSubmit: "Send",
        options: ['Yes','No'],
        ifttt: {
          event: "survey",
          key: "f443ynIgxOUGTdo7yQ_KyYhZDvAXQX9zd1ltvurRfpP"
        },
        thankYou: {
          title: "Thank You!",
          message: "Your feedback is appreciated. If you have any pressing concerns about your order, please contact us at <a href='mailto:support@lionlegion.co.uk'>support@lionlegion.co.uk</a>"
        }
      };
      let lines = [
        `<style>.btn-primary {flex:auto;min-width: -webkit-max-content;min-width: -moz-max-content;min-width: max-content;background-image: linear-gradient(to top, var(--tw-gradient-stops));padding-left: 1rem;padding-right: 1rem;padding-top: 0.5rem;padding-bottom: 0.5rem;--tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);}.btn-primary:hover {background-image: linear-gradient(to bottom, var(--tw-gradient-stops));--tw-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);}.btn-primary:disabled {pointer-events: none;--tw-gradient-from: #525252;--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(82, 82, 82, 0));--tw-gradient-to: #737373;--tw-text-opacity: 1;color: rgba(249, 250, 251, var(--tw-text-opacity));}.btn-primary {--tw-gradient-from: #15803d;--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(21, 128, 61, 0));--tw-gradient-to: #16a34a;--tw-text-opacity: 1;color: rgba(249, 250, 251, var(--tw-text-opacity));}.btn-primary:hover {--tw-text-opacity: 1;color: rgba(255, 255, 255, var(--tw-text-opacity));}</style><h2>${survey.question}</h2>`
      ];
      window.Daybreak = window.Daybreak || {};
      window.Daybreak.ppsSubmit = async function(el) {
        let value = el.innerText;
        if (el.id == "submit")
          value = encodeURIComponent(el.closest(".content-box").querySelector("#freeText").value);
        if (value === "")
          return;
        disableButtons(el);
        await postAnswer(value);
        showThanks(el);
      };
      function disableButtons(el) {
        el.closest(".content-box").querySelectorAll(".btn-primary").forEach((el2) => {
          el2.disabled = true;
        });
      }
      async function postAnswer(value) {
        await fetch(`https://maker.ifttt.com/trigger/${survey.ifttt.event}/with/key/${survey.ifttt.key}?value1=${survey.qId}&value2=${value}`, { method: "GET", mode: "no-cors" });
      }
      function showThanks(el) {
        el.closest(".content-box").style.display = "none";
        Shopify.Checkout.OrderStatus.addContentBox(`<h2>${survey.thankYou.title}</h2>`, survey.thankYou.message);
      }
      function addContent(content) {
        Shopify.Checkout.OrderStatus.addContentBox(...content);
        setTimeout(() => {
          let buttons = document.querySelectorAll(".btn-primary");
          buttons.forEach((el) => {
            el.addEventListener("click", () => window.Daybreak.ppsSubmit(el));
          });
        }, 100);
      }
      function multiChoice() {
        lines.push([
          survey.desc,
          '<div style="display: grid;width: 100%;grid-template-columns: repeat(2, minmax(0, 1fr));gap: 1rem;margin-top:.5rem">',
          ...survey.options.map((l) => `<button class="btn-primary">${l}</button>`),
          "</div>"
        ].join(""));
        addContent(lines);
      }
      function textInput() {
        lines.push([
          survey.desc,
          `<textarea type="text" id="freeText" style="display: block;padding: .5rem;margin-bottom: .5rem;margin-top: .5rem;border: gray solid 1px;width: 100%;box-sizing: border-box;"placeholder="${survey.textInputPlaceholder}" rows="3"></textarea>`,
          `<button class="btn-primary" style="width:100%" id="submit">${survey.textInputSubmit}</button>`,
          "</div>"
        ].join(""));
        addContent(lines);
      }
      if (survey.type == "buttons")
        return multiChoice();
      if (survey.type == "text")
        return textInput();
    })();
  })();
  