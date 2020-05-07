var TTS = {
    speak: function(sender, text, voice, volume, rate, pitch, lang) {
      var payload = {
        sender: sender,
        text: text,
        voice: voice,
        volume: volume,
        rate: rate,
        pitch: pitch,
        lang: lang
      };
      var ttsText = '{{tts_token}}' + JSON.stringify(payload);
      $.panelsocketserver.triggerAudioPanel(ttsText);
    }
};

//Adding TTS to PhantomBot
(function(){
    var ttsVoice = $.getSetIniDbString('ttsSettings', 'ttsVoice', 'US English Female'),
        ttsVolume = $.getSetIniDbFloat('ttsSettings', 'ttsVolume', 1.00),
        ttsRate = $.getSetIniDbFloat('ttsSettings', 'ttsRate', 1.00),
        ttsPitch = $.getSetIniDbFloat('ttsSettings', 'ttsPitch', 1.00),
        ttsLang = $.getSetIniDbFloat('ttsSettings', 'ttsLang', 'en-GB');

    /**
     * @function reloadtts
     */
    function reloadtts() {
        ttsVoice = $.getIniDbString('ttsSettings', 'ttsVoice'),
        ttsVolume = $.getIniDbFloat('ttsSettings', 'ttsVolume'),
        ttsRate = $.getIniDbFloat('ttsSettings', 'ttsRate'),
        ttsPitch = $.getIniDbFloat('ttsSettings', 'ttsPitch'),
        ttsLang = $.getIniDbFloat('ttsSettings', 'ttsLang');
    }

    /**
     * @event command
     */
    $.bind('command',function(event){
        var sender = event.getSender().toLowerCase(),
            command = event.getCommand(),
            allArgs = event.getArgs(),
            action = allArgs[0],
            actionFloat = parseFloat(allArgs[0]);

        /**
         * @commandpath tts [message] - Base command for ttsSystem.
         */
        if (command.equalsIgnoreCase('tts')){
            var ttsText = allArgs.join(" ");
            if (action) {
                TTS.speak(sender, ttsText, ttsVoice, ttsVolume, ttsRate, ttsPitch, ttsLang);
            }
        }

        /**
         * @commandpath ttsvoice [voice] - Voice setting for ttsSystem.
         */
        if (command.equalsIgnoreCase('ttsvoice')){
            if (!action) {
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttsvoice.usage'));
            } else {
                ttsVoice = $.setIniDbString('ttsSettings', 'ttsVoice', allArgs);
                reloadtts();
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttsvoice.set', allArgs));
            }
        }

        /**
         * @commandpath ttsvoice [volume] - Voice setting for ttsSystem.
         */
        if (command.equalsIgnoreCase('ttsvolume')){
            if (!actionFloat) {
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttsvolume.usage'));
            } else {
                ttsVolume = $.getIniDbFloat('ttsSettings', 'ttsVolume', actionFloat);
                reloadtts();
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttsvolume.set', actionFloat));
            }
        }

        /**
         * @commandpath ttsrate [rate] - Rate setting for ttsSystem.
         */
        if (command.equalsIgnoreCase('ttsrate')){
            if (!actionFloat) {
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttsrate.usage'));
            } else {
                ttsRate = $.getIniDbFloat('ttsSettings', 'ttsRate', actionFloat);
                reloadtts();
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttsrate.set', actionFloat));
            }
        }

        /**
         * @commandpath ttspitch [pitch] - Pitch setting for ttsSystem.
         */
        if (command.equalsIgnoreCase('ttspitch')){
            if (!actionFloat) {
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttspitch.usage'));
            } else {
                ttsPitch = $.getIniDbFloat('ttsSettings', 'ttsPitch', actionFloat);
                reloadtts();
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttspitch.set', actionFloat));
            }
        }

        /**
         * @commandpath ttslang [lang] - Language setting for ttsSystem.
         */
        if (command.equalsIgnoreCase('ttslang')){
            if (!actionFloat) {
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttslang.usage'));
            } else {
                ttsPitch = $.getIniDbFloat('ttsSettings', 'ttsLang', actionFloat);
                reloadtts();
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttslang.set', actionFloat));
            }
        }
    });

    //Register command.
    $.bind('initReady',function(){
        if($.bot.isModuleEnabled('./custom/ttsSystem.js')){
            $.registerChatCommand('./custom/ttsSystem.js','tts',7);
            $.registerChatCommand('./custom/ttsSystem.js','ttsvoice',1);
            $.registerChatCommand('./custom/ttsSystem.js','ttsvolume',1);
            $.registerChatCommand('./custom/ttsSystem.js','ttsrate',1);
            $.registerChatCommand('./custom/ttsSystem.js','ttspitch',1);
            $.registerChatCommand('./custom/ttsSystem.js','ttslang',1);
        }
    });

    $.reloadtts = reloadtts;
})();
