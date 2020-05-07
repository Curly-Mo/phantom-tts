let TTS = {
    speak: function(inputText) {
      let ttsText = "{{tts_token}}" + inputText;
      $.panelsocketserver.triggerAudioPanel(ttsText);
    }
};

//Adding text to tts to PhantomBot
(function(){

  triggerAudioPanel

    var textVoice = $.getSetIniDbString('ttsSettings', 'textVoice', 'US English Female'),
        textVolume = $.getSetIniDbFloat('ttsSettings', 'textVolume', 0.50),
        textRate = $.getSetIniDbFloat('ttsSettings', 'textRate', 0.95),
        textPitch = $.getSetIniDbFloat('ttsSettings', 'textPitch', 1.10);

    /**
     * @function reloadtts
     */
    function reloadtts() {
        textVoice = $.getIniDbString('ttsSettings', 'textVoice'),
        textVolume = $.getIniDbFloat('ttsSettings', 'textVolume'),
        textRate = $.getIniDbFloat('ttsSettings', 'textRate'),
        textPitch = $.getIniDbFloat('ttsSettings', 'textPitch');
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
            var ttsText =  sender + ": ";
            for (i = 0; i < allArgs.length; i++){
                ttsText += allArgs[i].replace(",", "") + " ";
            }
            
            if (action) {
                $.panelsocketserver.triggerTTS(ttsText +','+ textVoice +','+ textVolume +','+ textRate +','+ textPitch);
            }
        }

        /**
         * @commandpath ttsvoice [voice] - Voice setting for ttsSystem.
         */
        if (command.equalsIgnoreCase('ttsvoice')){
            if (!action) {
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttsvoice.usage'));
            } else {
                textVoice = $.setIniDbString('ttsSettings', 'textVoice', allArgs);
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
                textVolume = $.getIniDbFloat('ttsSettings', 'textVolume', actionFloat);
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
                textRate = $.getIniDbFloat('ttsSettings', 'textRate', actionFloat);
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
                textPitch = $.getIniDbFloat('ttsSettings', 'textPitch', actionFloat);
                reloadtts();
                $.say($.whisperPrefix(sender) + $.lang.get('tts.ttspitch.set', actionFloat));
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
        }
    });

    $.reloadtts = reloadtts;
})();
