import * as Blockly from 'blockly';

const categoryColor = "#58a69c";

Blockly.Blocks['text_asText'] = {
    init: function () {
        this.appendValueInput('INPUT')
            .setCheck(null);
        this.appendDummyInput()
            .appendField('as text');
        this.setColour(categoryColor);
        this.setTooltip('Returns the input as text.');
        this.setOutput(true, 'String');
    }
};

Blockly.Blocks['text_join'] = {
    init: function () {
        this.appendValueInput('INPUT1')
            .appendField('join')
            .setCheck(null);
        this.appendValueInput('INPUT2')
            .setCheck(null);
        this.setColour(categoryColor);
        this.setOutput(true, 'String');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_toCase'] = {
    init: function () {
        this.appendValueInput('INPUT')
            .setCheck("String");
        this.appendDummyInput()
            .appendField('to')
            .appendField(new Blockly.FieldDropdown([
                ['lower', 'lower'],
                ['UPPER', 'upper'],
            ]), 'CASE').appendField('case');
        this.setColour(categoryColor);
        this.setOutput(true, 'String');
    }
};

Blockly.Blocks['text_length'] = {
    init: function () {
        this.appendValueInput('INPUT')
            .setCheck('String')
            .appendField('length of');
        this.setColour(categoryColor);
        this.setOutput(true, 'Number');
    }
};

Blockly.Blocks['text_contains'] = {
    init: function () {
        this.appendValueInput('INPUT')
            .setCheck('String')
            .appendField('does text');
        this.appendValueInput('SUB')
            .setCheck('String')
            .appendField('include');
        this.appendDummyInput()
            .appendField("?");
        this.setColour(categoryColor);
        this.setOutput(true, 'Boolean');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_startsEnds'] = {
    init: function () {
        this.appendValueInput('INPUT')
            .setCheck('String')
            .appendField('does text');
        this.appendValueInput('SUB')
            .setCheck('String')
            .appendField(new Blockly.FieldDropdown([
                ['start', 'starts'],
                ['end', 'ends']
            ]), 'MODE')
            .appendField("with");
        this.appendDummyInput()
            .appendField("?");
        this.setColour(categoryColor);
        this.setOutput(true, 'Boolean');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_lettersFrom'] = {
    init: function () {
        this.appendValueInput('START')
            .setCheck('Number')
            .appendField('letters #');
        this.appendValueInput('END')
            .setCheck('Number')
            .appendField('to #');
        this.appendValueInput('input')
            .setCheck('String')
            .appendField('of text');
        this.setColour(categoryColor);
        this.setOutput(true, 'String');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_replace'] = {
    init: function () {
        this.appendValueInput('FROM')
            .setCheck('String')
            .appendField('replace');
        this.appendValueInput('TO')
            .setCheck('String')
            .appendField('with');
        this.appendValueInput('INPUT')
            .setCheck('String')
            .appendField('in text');
        this.setColour(categoryColor);
        this.setOutput(true, 'String');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_charAt'] = {
    init: function () {
        this.appendValueInput('INDEX')
            .setCheck('Number')
            .appendField('letter #');
        this.appendValueInput('INPUT')
            .setCheck('String')
            .appendField('in text');
        this.setColour(categoryColor);
        this.setOutput(true, 'String');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_indexOf'] = {
    init: function () {
        this.appendValueInput('SUB')
            .setCheck('String')
            .appendField('index of');
        this.appendValueInput('INPUT')
            .setCheck('String')
            .appendField('in text');
        this.setColour(categoryColor);
        this.setOutput(true, 'Number');
        this.setInputsInline(true);
    }
};

Blockly.Blocks['text_logConsole'] = {
    init: function () {
        this.appendValueInput('INPUT')
            .appendField('log')
            .setCheck(null);
        this.appendDummyInput()
            .appendField('to console');
        this.setColour(categoryColor);
        this.setTooltip('Logs the input as text on the console.');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};
