document.addEventListener("DOMContentLoaded", function() {
    var storedBotToken = localStorage.getItem("botToken");
    var storedChatID = localStorage.getItem("chatID");
    if (storedBotToken && storedChatID) {
        document.getElementById("botToken").value = storedBotToken;
        document.getElementById("chatID").value = storedChatID;
    }

    document.getElementById("telegramForm").addEventListener("submit", function(event) {
        event.preventDefault();

        var botToken = document.getElementById("botToken").value.trim();
        var chatID = document.getElementById("chatID").value.trim();
        var message = document.getElementById("message").value.trim();

        if (!botToken || !chatID || !message) {
            alert("Silakan isi semua kolom.");
            return;
        }

        localStorage.setItem("botToken", botToken);
        localStorage.setItem("chatID", chatID);

        var url = "https://api.telegram.org/bot" + botToken + "/sendMessage?chat_id=" + chatID + "&text=" + encodeURIComponent(message);

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Respon jaringan tidak berhasil');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.ok) {
                alert("Pesan berhasil dikirim!");
                document.getElementById("telegramForm").reset();
            } else {
                throw new Error(data.description);
            }
        })
        .catch(error => {
            console.error('Ada masalah dengan operasi pengambilan data Anda:', error);
            alert("Gagal mengirim pesan. Harap periksa bot token, chat ID, dan koneksi internet Anda.");
        });
    });
});