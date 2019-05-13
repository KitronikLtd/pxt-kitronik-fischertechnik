# pxt-kitronik-fischertechnik

# Kitronik blocks for micro:bit

Blocks that support [Kitronik kits and shields for the micro:bit](https://www.kitronik.co.uk/microbit.html)
This package is for the [Kitronik ACCESS:bit] (http://www.kitronik.co.uk/5656)

## Interface for Fischertechnik

* Turn on a motor

```blocks
	input.onButtonPressed(Button.A, function () {
    
	Kitronik_IFF.motorOn(Kitronik_IFF.Motors.Motor1, Kitronik_IFF.MotorDirection.Forward, 100)
})
```

* Turn off a motor

```blocks
    input.onButtonPressed(Button.B, function () {
    
	Kitronik_IFF.motorOff(Kitronik_IFF.Motors.Motor1)
```

* Read NTC resistor

```blocks
    item = Kitronik_IFF.ntc(Kitronik_IFF.PinSelection.P0)
```

* Read Phototransistor voltage

```blocks
    item = Kitronik_IFF.readPhototransistor(Kitronik_IFF.PinSelection.P0)
```

* Control LED

```blocks
    Kitronik_IFF.led(Kitronik_IFF.PinSelection.P0, Kitronik_IFF.Illumination.On)
    basic.pause(1000)
    Kitronik_IFF.led(Kitronik_IFF.PinSelection.P0, Kitronik_IFF.Illumination.Off)
    basic.pause(1000)
```
## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)