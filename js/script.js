function calculateBMI(weight, height) {
  const bmi = weight / (height * height);
  let status = "";
  let category = "";
  let advice = "";

  // Determine BMI category
  if (bmi < 18.5) {
    category = "Kekurangan berat badan";
    status = "Anda memiliki berat badan di bawah normal";
    advice =
      "Makan lebih banyak makanan bergizi dan tingkatkan asupan kalori secara sehat. Konsultasikan dengan ahli gizi untuk meningkatkan berat badan secara aman.";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = "Normal (ideal)";
    status = "Berat badan Anda berada dalam kategori normal";
    advice =
      "Pertahankan pola hidup sehat dengan makanan bergizi dan olahraga teratur.";
  } else if (bmi >= 25.0 && bmi <= 29.9) {
    category = "Kelebihan berat badan";
    status = "Anda memiliki kelebihan berat badan";
    advice =
      "Kurangi konsumsi makanan tinggi kalori, gula, dan lemak. Tingkatkan aktivitas fisik dengan olahraga teratur untuk mencapai berat badan ideal.";
  } else if (bmi >= 30.0) {
    category = "Kegemukan (Obesitas)";
    status = "Anda memiliki berat badan berlebih atau obesitas";
    advice =
      "Konsultasikan dengan dokter atau ahli gizi untuk program penurunan berat badan yang sesuai. Hindari makanan olahan dan tingkatkan aktivitas fisik.";
  } else {
    category = "Nilai tidak valid";
    status = "BMI yang dihitung tidak valid, harap periksa input Anda.";
    advice = "";
  }

  // Special case for BMI between 23 and 25
  if (bmi >= 23 && bmi <= 25) {
    advice =
      "Cara terbaik untuk mencapai berat badan ideal adalah dengan mengatur pola makan dan berolahraga secara rutin.";
  }

  return { bmi: bmi.toFixed(1), category, status, advice };
}

// Form submission handler
document.getElementById("bmiForm").addEventListener("submit", function (event) {
  event.preventDefault();

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

  loading.classList.remove("hidden");
  resultContainer.classList.add("hidden");

  setTimeout(() => {
    // Hide loading and display results
    loading.classList.add("hidden");
    resultContainer.classList.remove("hidden");

    // Generate and display result content dynamically
    resultCard.innerHTML = `
      <div class="bmi-summary">
        <h3>${result.category}</h3>
        <p class="bmi-value">${result.bmi}</p>
        <p class="bmi-status">${result.status}</p>
        <p>Jenis Kelamin: ${gender === "male" ? "Pria" : "Wanita"}</p>
      </div>
      <div class="bmi-details">
        <p>${result.advice}</p>
      </div>
    `;
  }, 2000); // Simulate 2-second loading
});
