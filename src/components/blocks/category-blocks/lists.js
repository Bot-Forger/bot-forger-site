import * as Blockly from 'blockly';
import { DuplicateOnDrag } from '../patches.js';

const categoryColor = '#e53935';

Blockly.Blocks['lists_forEach'] = {
    init: function () {
        this.appendValueInput('ITEM')
            .appendField('for each');
        this.appendValueInput('LIST')
            .setCheck('List')
            .appendField('in');
        this.appendStatementInput('DO');
        this.setColour(categoryColor);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setInputsInline(true);
    }
};

Blockly.Blocks['lists_forEach_item'] = {
    init: function () {
        this.appendDummyInput().appendField('item');
        this.setColour(categoryColor);
        this.setOutput(true, null);

        this.setMovable(true);
        this.setDeletable(true);

        setTimeout(() => {
            if (this.setDragStrategy && this.isShadow()) {
                this.setDragStrategy(new DuplicateOnDrag(this));
            }
        });
    }
};

