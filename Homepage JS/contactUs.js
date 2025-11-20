const fields = [
    document.getElementById("name"),
    document.getElementById("email"),
    document.getElementById("subject"),
    document.getElementById("message")
];

const submitBtn = document.getElementById("submitBtn");

function checkForm() {
    const filled = fields.every(f => f.value.trim() !== "");
    submitBtn.disabled = !filled;
}

fields.forEach(f => f.addEventListener("input", checkForm));

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    const delay = Math.floor(Math.random() * 5) + 1;

    setTimeout(() => {

        submitBtn.innerText = "Submitted ✓";

        setTimeout(() => {
            submitBtn.innerText = "Submit";

            fields.forEach(f => f.value = "");
            submitBtn.disabled = true;

        }, 3000);

    }, delay * 1000);
});
