input.onButtonPressed(Button.A, function () {
    
	Kitronik_IFF.motorOn(Kitronik_IFF.Motors.Motor1, Kitronik_IFF.MotorDirection.Forward, 0)

})

basic.forever(function () {
    
	let light = Kitronik_IFF.readPhototransistor(Kitronik_IFF.PinSelection.P0)

	if (light > 128)  
	{  
		Kitronik_IFF.led(Kitronik_IFF.PinSelection.P0, Kitronik_IFF.Illumination.Off)
    
	}
	else
	{
		Kitronik_IFF.led(Kitronik_IFF.PinSelection.P0, Kitronik_IFF.Illumination.On)
    
	}
	Kitronik_IFF.motorOff(Kitronik_IFF.Motors.Motor1)

})