// Function to calculate BMI and determine advice
function calculateBMI(weight, height) {
  const bmi = weight / (height * height);
  let category = "";
  let status = "";
  let advice = "";
  let range = "";

  // Determine BMI category and corresponding advice
  if (bmi < 18.5) {
    category = "Kekurangan berat badan";
    status = "Anda memiliki berat badan di bawah normal";
    advice =
      "Makan lebih banyak makanan bergizi dan tingkatkan asupan kalori secara sehat. Konsultasikan dengan ahli gizi untuk meningkatkan berat badan secara aman.";
    range = "Kurang dari 18.5";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal (ideal)";
    status = "Berat badan Anda berada dalam kategori normal";
    advice =
      "Pertahankan pola hidup sehat dengan makanan bergizi dan olahraga teratur.";
    range = "18.5 dan 24.9";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    category = "Kelebihan berat badan";
    status = "Anda memiliki kelebihan berat badan";
    advice =
      "Kurangi konsumsi makanan tinggi kalori, gula, dan lemak. Tingkatkan aktivitas fisik dengan olahraga teratur untuk mencapai berat badan ideal.";
    range = "25.0 dan 29.9";
  } else if (bmi >= 30.0) {
    category = "Kegemukan (Obesitas)";
    status = "Anda memiliki berat badan berlebih atau obesitas";
    advice =
      "Konsultasikan dengan dokter atau ahli gizi untuk program penurunan berat badan yang sesuai. Hindari makanan olahan dan tingkatkan aktivitas fisik.";
    range = "30.0 atau lebih";
  } else {
    category = "Nilai tidak valid";
    status = "BMI yang dihitung tidak valid, harap periksa input Anda.";
    advice = "";
    range = "Nilai tidak valid";
  }

  // Additional advice for BMI between 23 and 25
  if (bmi >= 23 && bmi <= 25) {
    advice +=
      " Cara terbaik untuk mencapai berat badan ideal adalah dengan mengatur pola makan dan berolahraga secara rutin.";
  }

  return { bmi: bmi.toFixed(1), category, status, advice, range };
}

// Form submission handler
document.getElementById("bmiForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  // Retrieve input values
  const weight = parseFloat(document.getElementById("weight").value);
  const heightCm = parseFloat(document.getElementById("height").value);
  const genderInput = document.querySelector('input[name="gender"]:checked');

  // Validate gender selection
  if (!genderInput) {
    alert("Pilih jenis kelamin Anda!");
    return;
  }

  const gender = genderInput.value;

  // Validate weight and height inputs
  if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
    alert("Masukkan nilai berat badan dan tinggi badan yang valid!");
    return;
  }

  // Perform BMI calculation
  const heightM = heightCm / 100; // Convert height from cm to meters
  const result = calculateBMI(weight, heightM);

  // Show loading animation
  const loading = document.getElementById("loading");
  const resultContainer = document.getElementById("result-container");
  const resultCard = document.getElementById("result");

  // Show loading animation and hide result container
  loading.classList.remove("hidden");
  resultContainer.classList.add("hidden");

  // Simulate processing delay (e.g., 2 seconds)
  setTimeout(() => {
    // Hide loading animation and show result container
    loading.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    // Generate and display result content dynamically
    resultCard.innerHTML = `
      <div class="bmi-summary">
        <p class="result-gender">Jenis Kelamin: ${
          gender === "male" ? "Pria" : "Wanita"
        }</p>
        <h3>${result.category}</h3>
        <p class="bmi-value">${result.bmi}</p>
        <p class="bmi-status">${result.status}</p>
      </div>
      <div class="bmi-details">
        <p class="bmi-range">Hasil BMI diantara ${result.range}</p>
        <p>${result.advice}</p>
      </div>
    `;

    // Scroll to the result section
    document.getElementById("results-section").scrollIntoView({
      behavior: "smooth",
    });
  }, 2000);
});

// Reset handler to clear results
document.getElementById("bmiForm").addEventListener("reset", function () {
  const resultContainer = document.getElementById("result-container");
  const resultCard = document.getElementById("result");
  const loading = document.getElementById("loading");

  // Hide results and loading animations
  resultContainer.classList.add("hidden");
  loading.classList.add("hidden");

  // Clear result content
  resultCard.innerHTML = "";
});
