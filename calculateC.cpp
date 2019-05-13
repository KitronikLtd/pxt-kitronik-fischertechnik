#include "pxt.h"
#include "math.h"
using namespace pxt;

/**
 * Kitronik Interface for Fischertechnik blocks
 */
//% color=#00A654 weight=100
namespace Kitronik_IFF {

	#define ALPHA 0.13 
	#define BETA 3880
	#define R_PULL_UP 4700
	#define VOLTAGE_SUPPLY 3.3
	#define KELVIN 273.15
	#define ADC_RES 1024
	#define NTC_R25 1500

    //%
    float calculateC(float fVoltageReading) {
		float fConvertVoltReading = fVoltageReading * (VOLTAGE_SUPPLY/ADC_RES);
		float fNtcResistor = VOLTAGE_SUPPLY/((VOLTAGE_SUPPLY - fConvertVoltReading)/R_PULL_UP);
		fNtcResistor = 0 - (NTC_R25 - fNtcResistor);
		float fTemperatureC = (BETA/(log(fNtcResistor/ALPHA))) - KELVIN;
		int iTempCInt = fTemperatureC * 100;
		fTemperatureC = iTempCInt / 100;
		return fTemperatureC;
    }
}