// Function that handles text to speech.
$(function () {
    socket.getDBValues('get_tts_settings', {
        tables: ['ttsSettings', 'ttsSettings', 'ttsSettings', 'ttsSettings', 'ttsSettings'],
        keys: ['ttsVoice', 'ttsVolume', 'ttsRate', 'ttsPitch', 'ttsLang']
    }, true, function (e) {
        // Update ttsVoice.
        let voiceNames = speechSynthesis.getVoices().map((voice) => voice.name);

        $('#tts')
            .append(helpers.getDropdownGroup('tts-voices', 'TTS Voice', e.ttsVoice, voiceNames, 'Voice name to use for TTS generation.'))
            // Update ttsVolume.
            .append(helpers.getInputGroup('tts-volume', 'text', 'TTS Volume', '1.00', e.ttsVolume, 'The volume for the text to speech. 0 means muted.', false))
            // Update ttsRate.
            .append(helpers.getInputGroup('tts-rate', 'text', 'TTS Rate', '1.00', e.ttsRate, 'The rate for the text to speech.', false))
            // Update ttsPitch.
            .append(helpers.getInputGroup('tts-pitch', 'text', 'TTS Pitch', '1.00', e.ttsPitch, 'The pitch for the text to speech.', false))
            // Update ttsLang.
            .append(helpers.getInputGroup('tts-lang', 'text', 'TTS Lang', 'en-GB', e.ttsLang, 'The locale for the text to speech.', false));
    });

    $('#tts-save').on('click', function () {
        let ttsVoice = $('#tts-voices').find(':selected').text(),
            ttsVolume = $('#tts-volume'),
            ttsRate = $('#tts-rate'),
            ttsPitch = $('#tts-pitch'),
            ttsLang = $('#tts-lang');

        switch (false) {
            case helpers.handleInputNumber(ttsVolume):
            case helpers.handleInputNumber(ttsRate):
            case helpers.handleInputNumber(ttsPitch):
                break;
            default:
                socket.updateDBValues('update_tts_settings', {
                    tables: ['ttsSettings', 'ttsSettings', 'ttsSettings', 'ttsSettings'],
                    keys: ['ttsVoice', 'ttsVolume', 'ttsRate', 'ttsPitch', 'ttsLang'],
                    values: [ttsVoice, ttsVolume.val(), ttsRate.val(), ttsPitch.val(), ttsLang]
                }, function () {
                    socket.sendCommand('update_tts_settings_cmd', 'reloadTTS', function () {
                        toastr.success('Successfully updated text to speech settings!');
                    });
                });
        }
    });
});
