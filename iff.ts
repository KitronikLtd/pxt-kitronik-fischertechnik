/**
 * Kitronik Interface for Fischertechnik blocks
 */
//% weight=100 color=#00A654 icon="\uf085" block="Interface for Fischertechnik"
//% groups='["General","Motors"]'
namespace Kitronik_IFF {

	//Selection of motor direction
    export enum MotorDirection {
        //% block="forward"
        Forward,
        //% block="reverse"
        Reverse
    }

	//selection of motor
    export enum Motors {
        //% block="motor 1"
        Motor1,
        //% block="motor 2"
        Motor2
    }

	//selection of IO pin
    export enum PinSelection {
        //% block="P0"
        P0,
        //% block="P1"
        P1
    }
	
	//choice of LED on and off
	export enum Illumination {
        //% block="Off"
        Off,
        //% block="On"
        On
    }
	
	/**
     * Calculate temperature in C with NTC formula Cpp shim
     */
    //% shim=Kitronik_IFF::calculateC
    function calculateC(voltageReading: number): number {
        return 0;
    }
	
    /**
    * Read Phototransistor block reads the pin that a Phototransistor is connected to
    * @param selectedPin is the pin which a Phototransistor is connected to
    */
    //% blockId=kitronik_fischertechnik_read_phototransistor
    //% block="read Phototransistor on %selectedPin"
	//% group=General
    //% weight=95 blockGap=8
    export function readPhototransistor(selectedPin: PinSelection) {
		let readPin = 0
		switch (selectedPin){
			case PinSelection.P0:
				readPin = pins.analogReadPin(AnalogPin.P0)
				break
			case PinSelection.P1:
				readPin = pins.analogReadPin(AnalogPin.P1)
				break
		}
		return readPin
    }
	
	/**
    * Set LED on a selected pin to be On or Off
    * @param selectedPin is the pin which a switch is connected to
	* @param illumination is the status of what the LED is going to be
    */
    //% blockId=kitronik_fischertechnik_led
    //% block="turn %selectedPin| LED %illumination"
	//% group=General
    //% weight=100 blockGap=8
    export function led(selectedPin: PinSelection, illumination: Illumination) {
		switch (selectedPin){
			case PinSelection.P0:
				pins.digitalWritePin(DigitalPin.P0, illumination)
				break
			case PinSelection.P1:
				pins.digitalWritePin(DigitalPin.P1, illumination)
				break
		}
    }
	
	/**
    * Set pin to read NTC voltage, block returns a number in degrees C
    * @param selectedPin is the pin which the NTC resistor is connected to
    */
    //% blockId=kitronik_fischertechnik_ntcr
    //% block="read NTC resistor on %selectedPin"
	//% group=General
    //% weight=90 blockGap=8
    export function ntc(selectedPin: PinSelection): number {
		//Formula for the NTC resistor, used in a Cpp shim
		//R=Ae^(B/T)
		//B = 4000
		//A = 0.02
		//T = -1/B ln(1/RA)
		let temperatureC = 0
		let voltageReading = 0
		
		switch (selectedPin){
			case PinSelection.P0:
				voltageReading = pins.analogReadPin(AnalogPin.P0)
				break
			case PinSelection.P1:
				voltageReading = pins.analogReadPin(AnalogPin.P1)
				break
		}
		
		temperatureC = calculateC(voltageReading)
		return temperatureC
    }
	
	/**
     * Turns on motor specified by Motors in the direction specified
     * by Direction, at the requested speed 
     *
	 * @param motor which motor to turn on
	 * @param dir   which direction to go
	 * @param speed how fast to spin the motor
     */
    //% blockId=kitronik_fischertechnik_motor_on
    //% block="%motor|on direction %dir|speed %speed"
	//% group=Motors
	//% weight=85 blockGap=8
    //% speed.min=0 speed.max=100
    export function motorOn(motor: Motors, dir: MotorDirection, speed: number): void {
        /*first convert 0-100 to 0-1024 (approx) We wont worry about the last 24 to make life simpler*/
        let outputVal = Math.clamp(0, 100, speed) * 10;

        switch (motor) {
            case Motors.Motor1: /*Motor 1 uses Pins 8 and 12*/
                switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P8, outputVal);
                        pins.digitalWritePin(DigitalPin.P12, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
                        break
                    case MotorDirection.Reverse:
                        pins.analogWritePin(AnalogPin.P12, outputVal);
                        pins.digitalWritePin(DigitalPin.P8, 0);
                        break
                }

                break;
            case Motors.Motor2: /*Motor 2 uses Pins 2 and 16*/
                switch (dir) {
                    case MotorDirection.Forward:
                        pins.analogWritePin(AnalogPin.P16, outputVal);
                        pins.digitalWritePin(DigitalPin.P2, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
                        break
                    case MotorDirection.Reverse:
                        pins.analogWritePin(AnalogPin.P2, outputVal);
                        pins.digitalWritePin(DigitalPin.P16, 0);
                        break
                }

                break;
        }
    }

	/**
     * Turns off the motor specified by Motors
     * @param motor which motor to turn off
     */
    //% blockId=kitronik_fischertechnik_motor_off
    //% block="turn off %motor"
	//% group=Motors
	//% weight=80 blockGap=8
    export function motorOff(motor: Motors): void {
        switch (motor) {
            case Motors.Motor1:
                pins.digitalWritePin(DigitalPin.P8, 0);
                pins.digitalWritePin(DigitalPin.P12, 0);
                break
            case Motors.Motor2:
                pins.digitalWritePin(DigitalPin.P2, 0);
                pins.digitalWritePin(DigitalPin.P16, 0);
                break
        }
    }
} 