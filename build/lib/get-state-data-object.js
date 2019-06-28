"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetStateDataObject {
    constructor(index, name, unit, offset, gain, measure) {
        this.set(index, name, unit, offset, gain, measure);
    }
    set(index, name, unit, offset, gain, measure) {
        // Set basic object values.
        this.id = index;
        this.label = name;
        this.displayValue = "";
        this.unit = unit;
        this.offset = Number(offset);
        this.gain = Number(gain);
        this.raw = Number(measure);
        this.value = this.offset + (this.gain * this.raw);
        this.category = this.category === undefined ? "none" : this.category;
        this.categoryId = this.categoryId === undefined ? 0 : this.categoryId;
        this.active = name !== "n.a."; // Mark object as active if it is not labeled with 'n.a.'.
        // Set display value according to the object unit.
        switch (this.unit) {
            case "C":
            case "F":
                this.displayValue = `${Number(this.value).toFixed(2)} °${this.unit}`;
                break;
            case "h":
                this.displayValue = ((Number(this.value) >> 8) < 10 ? 0 : "") + "" +
                    (Number(this.value) >> 8) + ":" + ((Number(this.value) & 0xFF) < 10 ? 0 : "") + "" +
                    (Number(this.value) & 0xFF);
                break;
            // case "pH":
            //     this.displayValue = `${this.unit} ${this.value}`;
            //     break;
            case "--":
                this.displayValue = String(this.value);
                break;
            default:
                this.displayValue = `${Number(this.value).toFixed(2)} ${this.unit}`;
        }
    }
}
exports.GetStateDataObject = GetStateDataObject;