import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Clock, Sun, Moon, Compass, CalendarIcon, TableIcon, EyeIcon } from 'lucide-react';
import { PlanetaryHoursData } from '@/types';
import { calculatePlanetaryHours } from '@/utils/planetaryHoursCalculator';
import { zodiacImages, planetImages } from '@/assets/index';
import { CHALDEAN_ORDER, DAY_RULERS, ZODIAC_IMAGES, ZODIAC_NAMES } from '@/data/planetaryHours';
import * as SunCalc from 'suncalc';
import { format } from "date-fns";

const PlanetaryHours: React.FC = () => {
  const { language, t } = useLanguage();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [planetaryData, setPlanetaryData] = useState<PlanetaryHoursData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<'current' | 'table'>('current');
  const [calendarOpen, setCalendarOpen] = useState(false);

  const getLocation = () => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        calculateData(latitude, longitude);
      },
      (error) => {
        setError(`Error getting location: ${error.message}`);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const calculateData = (latitude: number, longitude: number, date?: Date) => {
    try {
      const data = calculatePlanetaryHours({
        latitude,
        longitude,
        language,
        date: date || new Date()
      });
      setPlanetaryData(data);
    } catch (err) {
      setError('Error calculating planetary hours data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh positions every minute for real-time updates
  useEffect(() => {
    if (!location) return;
    
    const interval = setInterval(() => {
      // Only auto-refresh if we're viewing current time (not a selected date)
      if (selectedDate.toDateString() === new Date().toDateString()) {
        calculateData(location.lat, location.lng, new Date());
      }
    }, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, [location, selectedDate]);

  const refreshData = () => {
    if (location) {
      setLoading(true);
      calculateData(location.lat, location.lng, selectedDate);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date && location) {
      setSelectedDate(date);
      calculateData(location.lat, location.lng, date);
      setCalendarOpen(false);
    }
  };

  const generateHourlyTable = () => {
    if (!planetaryData || !location) return [];
    
    const hours = [];
    
    // Get sunrise and sunset for the selected date
    const sunTimes = SunCalc.getTimes(selectedDate, location.lat, location.lng);
    const sunrise = sunTimes.sunrise;
    const sunset = sunTimes.sunset;
    
    // Calculate day and night duration
    const dayDuration = sunset.getTime() - sunrise.getTime();
    const nightDuration = 24 * 60 * 60 * 1000 - dayDuration;
    
    // Calculate hour lengths
    const dayHourLength = dayDuration / 12;
    const nightHourLength = nightDuration / 12;
    
    // Get day ruler for the selected date
    const dayOfWeek = selectedDate.getDay();
    const dayRuler = DAY_RULERS[dayOfWeek];
    const dayRulerIndex = CHALDEAN_ORDER.indexOf(dayRuler);
    
    for (let i = 0; i < 24; i++) {
      const astronomicalHour = i + 1;
      
      // Calculate actual time for this astronomical hour
      let hourStartTime: Date;
      let hourEndTime: Date;
      
      if (astronomicalHour <= 12) {
        // Day hours (1-12)
        hourStartTime = new Date(sunrise.getTime() + (astronomicalHour - 1) * dayHourLength);
        hourEndTime = new Date(sunrise.getTime() + astronomicalHour * dayHourLength);
      } else {
        // Night hours (13-24)
        const nightHourIndex = astronomicalHour - 13;
        hourStartTime = new Date(sunset.getTime() + nightHourIndex * nightHourLength);
        hourEndTime = new Date(sunset.getTime() + (nightHourIndex + 1) * nightHourLength);
      }
      
      // Calculate planetary ruler using same logic as calculator
      const hourRulerIndex = (dayRulerIndex + (astronomicalHour - 1)) % 7;
      const planet = CHALDEAN_ORDER[hourRulerIndex];
      
      // Format time range
      const timeRange = `${hourStartTime.getHours().toString().padStart(2, '0')}:${hourStartTime.getMinutes().toString().padStart(2, '0')}-${hourEndTime.getHours().toString().padStart(2, '0')}:${hourEndTime.getMinutes().toString().padStart(2, '0')}`;
      
      hours.push({
        hour: astronomicalHour,
        timeRange,
        planet,
        planetName: planet,
        isCurrent: astronomicalHour === planetaryData.planetaryHour.hourNumber
      });
    }
    return hours;
  };

  useEffect(() => {
    // Auto-update every minute
    const interval = setInterval(() => {
      if (location) {
        calculateData(location.lat, location.lng);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [location, language]);

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString(language === 'es' ? 'es-ES' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="font-display text-4xl md:text-5xl text-grimoire-amber mb-2">
          {t('planetaryHours', 'title')}
        </h1>
        <p className="font-serif text-lg text-grimoire-parchment max-w-2xl mx-auto">
          {t('planetaryHours', 'subtitle')}
        </p>
        
        {/* Controls */}
        <div className="flex justify-center gap-4 flex-wrap">
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-grimoire-amber/10 border-grimoire-gold text-grimoire-gold hover:bg-grimoire-amber/20">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {format(selectedDate, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-grimoire-parchment border-grimoire-gold">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          
          <Button
            variant={viewMode === 'current' ? 'default' : 'outline'}
            onClick={() => setViewMode('current')}
            className="bg-grimoire-amber/10 border-grimoire-gold text-grimoire-gold hover:bg-grimoire-amber/20"
          >
            <EyeIcon className="w-4 h-4 mr-2" />
            Current View
          </Button>
          
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            onClick={() => setViewMode('table')}
            className="bg-grimoire-amber/10 border-grimoire-gold text-grimoire-gold hover:bg-grimoire-amber/20"
          >
            <TableIcon className="w-4 h-4 mr-2" />
            Table View
          </Button>
          
          {location && (
            <Button
              onClick={refreshData}
              disabled={loading}
              className="bg-grimoire-amber/10 border-grimoire-gold text-grimoire-gold hover:bg-grimoire-amber/20"
            >
              <Clock className="w-4 h-4 mr-2" />
              {loading ? 'Updating...' : 'Refresh'}
            </Button>
          )}
        </div>
      </div>

      {/* Location Button */}
      {!location && (
        <div className="flex justify-center">
          <Button
            onClick={getLocation}
            disabled={loading}
            className="bg-grimoire-gold hover:bg-grimoire-gold/80 text-grimoire-dark font-accent text-lg px-8 py-3"
          >
            <MapPin className="w-5 h-5 mr-2" />
            {loading ? t('planetaryHours', 'calculating') : t('planetaryHours', 'getLocation')}
          </Button>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <Card className="bg-red-900/20 border-red-500">
          <CardContent className="pt-6">
            <p className="text-red-400 text-center">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Main Data Display */}
      {planetaryData && (
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'current' | 'table')} className="w-full">
          <TabsList className="grid w-full bg-grimoire-blue text-grimoire-gold grid-cols-2">
            <TabsTrigger value="current">Current View</TabsTrigger>
            <TabsTrigger value="table">24-Hour Table</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Time & Location */}
              <Card className="bg-grimoire-dark/70 border-grimoire-gold">
                <CardHeader>
                  <CardTitle className="font-display text-grimoire-amber flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {t('planetaryHours', 'currentTime')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-grimoire-parchment">
                    <p className="font-serif text-lg">
                      {formatDateTime(planetaryData.datetime)}
                    </p>
                    <p className="text-sm text-grimoire-parchment/70 mt-2">
                      {t('planetaryHours', 'location')}: {planetaryData.location.latitude.toFixed(4)}, {planetaryData.location.longitude.toFixed(4)}
                    </p>
                    <p className="text-sm text-grimoire-parchment/70">
                      {planetaryData.location.timezone}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Planetary Hour */}
              <Card className="bg-grimoire-dark/70 border-grimoire-gold">
                <CardHeader>
                  <CardTitle className="font-display text-grimoire-amber flex items-center gap-2">
                    <Sun className="w-5 h-5" />
                    {t('planetaryHours', 'hourRuler')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <img 
                        src={planetImages[planetaryData.planetaryHour.hourRuler.toLowerCase() as keyof typeof planetImages]} 
                        alt={planetaryData.planetaryHour.hourRuler}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="text-3xl font-display text-grimoire-gold">
                        {planetaryData.planetaryHour.hourRuler}
                      </div>
                    </div>
                    <div className="text-grimoire-parchment">
                      <p className="text-sm">{t('planetaryHours', 'dayRuler')}: {planetaryData.planetaryHour.dayRuler}</p>
                      <p className="text-sm">{t('planetaryHours', 'hourNumber')}: {planetaryData.planetaryHour.hourNumber}/24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tattvic Tide */}
              <Card className="bg-grimoire-dark/70 border-grimoire-gold">
                <CardHeader>
                  <CardTitle className="font-display text-grimoire-amber">
                    {t('planetaryHours', 'tattvicTide')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 flex items-center justify-center">
                      <img 
                        src={planetaryData.tattvicTide.icon} 
                        alt={planetaryData.tattvicTide.label}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-xl font-display text-grimoire-gold">
                        {planetaryData.tattvicTide.label}
                      </div>
                      <div className="text-sm text-grimoire-parchment/70 capitalize">
                        {planetaryData.tattvicTide.name}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Astronomical Data */}
              <Card className="bg-grimoire-dark/70 border-grimoire-gold">
                <CardHeader>
                  <CardTitle className="font-display text-grimoire-amber flex items-center gap-2">
                    <Compass className="w-5 h-5" />
                    Astronomical Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-grimoire-gold/10 rounded-lg border border-grimoire-gold/20">
                      <img 
                        src={planetImages.sun} 
                        alt="Sun"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-grimoire-amber font-semibold text-sm">{t('planetaryHours', 'sunPosition')}</div>
                        <div className="flex items-center gap-2">
                          <img 
                            src={ZODIAC_IMAGES[planetaryData.astrology.sunPosition.sign as keyof typeof ZODIAC_IMAGES]} 
                            alt={planetaryData.astrology.sunPosition.sign}
                            className="w-6 h-6 object-contain"
                          />
                          <span className="font-mono text-grimoire-gold text-lg">{planetaryData.astrology.sunPosition.formatted}</span>
                          <span className="text-grimoire-amber text-sm">{ZODIAC_NAMES[planetaryData.astrology.sunPosition.sign as keyof typeof ZODIAC_NAMES][language]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-grimoire-gold/10 rounded-lg border border-grimoire-gold/20">
                      <img 
                        src={planetImages.moon} 
                        alt="Moon"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-grimoire-amber font-semibold text-sm">{t('planetaryHours', 'moonPosition')}</div>
                        <div className="flex items-center gap-2">
                          <img 
                            src={ZODIAC_IMAGES[planetaryData.astrology.moonPosition.sign as keyof typeof ZODIAC_IMAGES]} 
                            alt={planetaryData.astrology.moonPosition.sign}
                            className="w-6 h-6 object-contain"
                          />
                          <span className="font-mono text-grimoire-gold text-lg">{planetaryData.astrology.moonPosition.formatted}</span>
                          <span className="text-grimoire-amber text-sm">{ZODIAC_NAMES[planetaryData.astrology.moonPosition.sign as keyof typeof ZODIAC_NAMES][language]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-grimoire-gold/10 rounded-lg border border-grimoire-gold/20">
                      <div className="text-grimoire-amber font-semibold text-sm">{t('planetaryHours', 'moonPhase')}</div>
                      <div className="text-grimoire-parchment text-base font-medium">{planetaryData.astrology.moonPhase}</div>
                    </div>
                    
                    <div className="p-3 bg-grimoire-gold/10 rounded-lg border border-grimoire-gold/20">
                      <div className="text-grimoire-amber font-semibold text-sm">{t('planetaryHours', 'ascendant')}</div>
                      <div className="flex items-center gap-2">
                        <img 
                          src={ZODIAC_IMAGES[planetaryData.astrology.ascendant.sign as keyof typeof ZODIAC_IMAGES]} 
                          alt={planetaryData.astrology.ascendant.sign}
                          className="w-5 h-5 object-contain"
                        />
                        <span className="font-mono text-grimoire-gold text-base">{planetaryData.astrology.ascendant.formatted}</span>
                        <span className="text-grimoire-amber text-xs">{ZODIAC_NAMES[planetaryData.astrology.ascendant.sign as keyof typeof ZODIAC_NAMES][language]}</span>
                      </div>
                    </div>
                    
                    <div className="col-span-1 md:col-span-2 p-3 bg-grimoire-gold/10 rounded-lg border border-grimoire-gold/20">
                      <div className="text-grimoire-amber font-semibold text-sm">{t('planetaryHours', 'midheaven')}</div>
                      <div className="flex items-center gap-2">
                        <img 
                          src={ZODIAC_IMAGES[planetaryData.astrology.midheaven.sign as keyof typeof ZODIAC_IMAGES]} 
                          alt={planetaryData.astrology.midheaven.sign}
                          className="w-5 h-5 object-contain"
                        />
                        <span className="font-mono text-grimoire-gold text-base">{planetaryData.astrology.midheaven.formatted}</span>
                        <span className="text-grimoire-amber text-xs">{ZODIAC_NAMES[planetaryData.astrology.midheaven.sign as keyof typeof ZODIAC_NAMES][language]}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="table" className="space-y-6">
            <Card className="bg-grimoire-dark/70 border-grimoire-gold">
              <CardHeader>
                <CardTitle className="font-display text-grimoire-amber">
                  24-Hour Planetary Rulers for {format(selectedDate, "PPP")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-grimoire-gold">Hour</TableHead>
                      <TableHead className="text-grimoire-gold">Time</TableHead>
                      <TableHead className="text-grimoire-gold">Planet</TableHead>
                      <TableHead className="text-grimoire-gold">Image</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {generateHourlyTable().map((hour) => (
                      <TableRow 
                        key={hour.hour} 
                        className={hour.isCurrent ? "bg-grimoire-gold/20" : ""}
                      >
                        <TableCell className="text-grimoire-parchment font-bold">
                          {hour.hour}
                        </TableCell>
                        <TableCell className="text-grimoire-parchment">
                          {hour.timeRange}
                        </TableCell>
                        <TableCell className="text-grimoire-gold capitalize">
                          {hour.planetName}
                        </TableCell>
                        <TableCell>
                          <img 
                            src={planetImages[hour.planet as keyof typeof planetImages]} 
                            alt={hour.planet}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Refresh Button */}
      {location && (
        <div className="flex justify-center">
          <Button
            onClick={() => calculateData(location.lat, location.lng, selectedDate)}
            disabled={loading}
            variant="outline"
            className="border-grimoire-gold bg-grimoire-blue text-grimoire-gold hover:bg-grimoire-gold hover:text-grimoire-dark"
          >
            <Clock className="w-4 h-4 mr-2" />
            {loading ? t('planetaryHours', 'calculating') : 'Refresh'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PlanetaryHours;