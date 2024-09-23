// contact.js
(() => {
  const initContactForm = () => {
    const contactForm = document.getElementById("contactForm");
    const formFeedback = document.getElementById("formFeedback");

    if (!contactForm) {
      console.error("Contact form element with ID 'contactForm' not found.");
      return;
    }

    const displayFeedback = (message, type) => {
      if (formFeedback) {
        formFeedback.textContent = message;
        formFeedback.className = `form-feedback ${type}`;
        formFeedback.setAttribute("aria-live", "polite");
        formFeedback.setAttribute("role", "alert");

        setTimeout(() => {
          formFeedback.textContent = "";
          formFeedback.className = "form-feedback";
        }, 5000);
      }
    };

    const toggleSubmitButton = (button, isSubmitting) => {
      button.disabled = isSubmitting;
      button.textContent = isSubmitting ? "Sending..." : "Send Message";
      button.setAttribute("aria-busy", isSubmitting);
    };

    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };

    const handleFormSubmit = async (event) => {
      event.preventDefault();

      const botField = document.getElementById("bot-field");
      if (botField && botField.value.trim() !== "") {
        displayFeedback("Spam detected. Submission blocked.", "error");
        return;
      }

      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && !validateEmail(emailField.value)) {
        displayFeedback("Please enter a valid email address.", "error");
        return;
      }

      const formData = new FormData(contactForm);
      const actionURL = contactForm.getAttribute("action");

      const submitButton = contactForm.querySelector(".submit-button");
      if (submitButton) {
        toggleSubmitButton(submitButton, true);
      }

      try {
        const response = await fetch(actionURL, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          displayFeedback(
            "Thank you for your message! Redirecting...",
            "success"
          );
          setTimeout(() => {
            window.location.href = "thank-you.html";
          }, 2000);
        } else {
          const data = await response.json();
          const errorMessage = data.errors
            ? "There was an error sending your message."
            : "Something went wrong. Please try again.";
          throw new Error(errorMessage);
        }
      } catch (error) {
        displayFeedback(error.message, "error");
        console.error("Form submission error:", error);
      } finally {
        if (submitButton) {
          toggleSubmitButton(submitButton, false);
        }
      }
    };

    const attachEventListeners = () => {
      contactForm.addEventListener("submit", handleFormSubmit);
    };

    attachEventListeners();
  };

  document.addEventListener("DOMContentLoaded", initContactForm);
})();
