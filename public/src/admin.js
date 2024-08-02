$(document).ready(function() {
    // Formani yuborishni boshqarish
    $('#settings-form').on('submit', function(e) {
        e.preventDefault(); // Formani standart yuborilishini to'xtatish

        var botToken = $('#botToken').val().trim();
        if (botToken === '') {
            // Token bo'sh bo'lsa, xabar berish
            $('#botToken').addClass('is-invalid'); // Formani xatolik holatida belgilash
            $('#error-message').text('Telegram bot tokeni kerak!');
            return;
        } else {
            $('#botToken').removeClass('is-invalid'); // Formani to'g'ri holatida belgilash
            $('#error-message').text('');
        }

        var formData = $(this).serialize(); // Form ma'lumotlarini olish

        // AJAX so'rovini yuborish
        $.ajax({
            url: '/admin/plugins/telegram-sso/save',
            method: 'POST',
            data: formData,
            beforeSend: function() {
                $('#save-button').prop('disabled', true); // Tugmani faollashtirishdan oldin o'chirish
                $('#save-button').text('Saqlanmoqda...'); // Tugma matnini o'zgartirish
            },
            success: function(response) {
                $('#save-button').prop('disabled', false); // Tugmani qayta faollashtirish
                $('#save-button').text('Saqlash'); // Tugma matnini qayta tiklash
                alert('Sozlamalar saqlandi!'); // Yozilgan ma'lumotlarni bildirish
            },
            error: function(xhr, status, error) {
                $('#save-button').prop('disabled', false); // Tugmani qayta faollashtirish
                $('#save-button').text('Saqlash'); // Tugma matnini qayta tiklash
                $('#error-message').text('Xatolik yuz berdi: ' + error); // Xatolik xabari
            }
        });
    });

    // Ma'lumotlarni olish va formaga joylash
    $.ajax({
        url: '/admin/plugins/telegram-sso/get-settings',
        method: 'GET',
        success: function(response) {
            $('#botToken').val(response.botToken); // Formga ma'lumotlarni joylash
        },
        error: function(xhr, status, error) {
            console.error('Xatolik yuz berdi: ' + error); // Xatolik haqida xabar berish
        }
    });
});
