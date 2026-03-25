import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';

const BlockCard = ({ timeOfDay, data }) => {
  if (!data) return null;

  // Icons based on time of day
  const icon = timeOfDay === 'morning' ? '☀️' : timeOfDay === 'afternoon' ? '☕️' : '🌙';

  return (
    <View style={styles.blockCard}>
      <View style={styles.blockHeader}>
        <View style={styles.timeBadge}>
            <Text style={styles.timeBadgeText}>{icon}  {timeOfDay.toUpperCase()}</Text>
        </View>
        <Text style={styles.weatherText}>{data.weatherPlaceholder}</Text>
      </View>

      <Text style={styles.blockTitle}>{data.title}</Text>
      
      {data.places && data.places.length > 0 && (
        <View style={styles.placesContainer}>
          {data.places.map((place, idx) => (
             <View key={idx} style={styles.placePill}>
                <Text style={styles.placeText}>📍 {place}</Text>
             </View>
          ))}
        </View>
      )}

      <Text style={styles.description}>{data.description}</Text>
      
      {data.food && (
          <View style={styles.foodRow}>
              <Text style={styles.foodIcon}>🍽️</Text>
              <Text style={styles.foodText}>{data.food}</Text>
          </View>
      )}
    </View>
  );
};

export default function ItineraryDetailScreen({ route, navigation }) {
  const { itinerary } = route.params || {};

  if (!itinerary) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
            <Text style={styles.errorText}>No itinerary data found.</Text>
            <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Text style={styles.backBtnText}>Go Back</Text>
            </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.popToTop()}>
            <Text style={styles.iconBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Itinerary</Text>
        <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconBtnText}>💾</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroSection}>
            <Text style={styles.heroEyebrow}>{itinerary.destination}</Text>
            <Text style={styles.heroTitle}>{itinerary.title}</Text>
            <Text style={styles.heroSummary}>{itinerary.summary}</Text>
        </View>

        {itinerary.days?.map((dayObj, index) => (
          <View key={index} style={styles.dayContainer}>
            <View style={styles.dayHeader}>
               <View style={styles.dayDot} />
               <View>
                 <Text style={styles.dayLabel}>DAY {dayObj.day}</Text>
                 <Text style={styles.dateLabel}>{dayObj.date}</Text>
               </View>
            </View>
            
            <View style={styles.timelineContent}>
                {dayObj.activities?.morning && <BlockCard timeOfDay="morning" data={dayObj.activities.morning} />}
                {dayObj.activities?.afternoon && <BlockCard timeOfDay="afternoon" data={dayObj.activities.afternoon} />}
                {dayObj.activities?.evening && <BlockCard timeOfDay="evening" data={dayObj.activities.evening} />}
            </View>
          </View>
        ))}

        {itinerary.tips && itinerary.tips.length > 0 && (
            <View style={styles.tipsSection}>
                <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
                {itinerary.tips.map((tip, i) => (
                    <View key={i} style={styles.tipRow}>
                        <Text style={styles.tipBullet}>•</Text>
                        <Text style={styles.tipText}>{tip}</Text>
                    </View>
                ))}
            </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  centerContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
  },
  errorText: {
      color: '#FFFFFF',
      fontSize: 18,
      marginBottom: 20,
  },
  backBtn: {
      backgroundColor: '#2A2B38',
      padding: 16,
      borderRadius: 12,
  },
  backBtnText: {
      color: '#FFFFFF',
      fontWeight: '700',
  },
  headerBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#2A2B38',
  },
  iconBtn: {
      height: 40,
      width: 40,
      borderRadius: 20,
      backgroundColor: '#2A2B38',
      justifyContent: 'center',
      alignItems: 'center',
  },
  iconBtnText: {
      color: '#FFFFFF',
      fontSize: 16,
  },
  headerTitle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '800',
      letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 60,
  },
  heroSection: {
      marginBottom: 40,
  },
  heroEyebrow: {
      color: '#6B62FF',
      fontSize: 12,
      fontWeight: '800',
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 8,
  },
  heroTitle: {
      color: '#FFFFFF',
      fontSize: 32,
      fontWeight: '900',
      marginBottom: 12,
      lineHeight: 38,
  },
  heroSummary: {
      color: '#8E8E93',
      fontSize: 16,
      lineHeight: 24,
  },
  dayContainer: {
      marginBottom: 40,
  },
  dayHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
  },
  dayDot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#6B62FF',
      marginRight: 16,
      shadowColor: '#6B62FF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 6,
  },
  dayLabel: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '800',
      marginBottom: 2,
  },
  dateLabel: {
      color: '#8E8E93',
      fontSize: 14,
      fontWeight: '600',
  },
  timelineContent: {
      borderLeftWidth: 2,
      borderLeftColor: '#2A2B38',
      marginLeft: 5,
      paddingLeft: 22,
      paddingBottom: 10,
  },
  blockCard: {
      backgroundColor: '#2A2B38',
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
  },
  blockHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
  },
  timeBadge: {
      backgroundColor: '#1E1D33',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
  },
  timeBadgeText: {
      color: '#6B62FF',
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 0.5,
  },
  weatherText: {
      color: '#8E8E93',
      fontSize: 12,
      fontStyle: 'italic',
  },
  blockTitle: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 8,
  },
  placesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 12,
  },
  placePill: {
      backgroundColor: 'rgba(255,255,255,0.1)',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
  },
  placeText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '600',
  },
  description: {
      color: '#8E8E93',
      fontSize: 14,
      lineHeight: 22,
      marginBottom: 16,
  },
  foodRow: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1E1D33',
      padding: 12,
      borderRadius: 12,
  },
  foodIcon: {
      marginRight: 12,
      fontSize: 16,
  },
  foodText: {
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '500',
      flex: 1,
  },
  tipsSection: {
      backgroundColor: 'rgba(107, 98, 255, 0.1)',
      borderRadius: 16,
      padding: 20,
      marginTop: 20,
      borderWidth: 1,
      borderColor: 'rgba(107, 98, 255, 0.3)',
  },
  tipsTitle: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '800',
      marginBottom: 16,
  },
  tipRow: {
      flexDirection: 'row',
      marginBottom: 12,
      alignItems: 'flex-start',
  },
  tipBullet: {
      color: '#6B62FF',
      fontSize: 18,
      marginRight: 12,
      lineHeight: 20,
  },
  tipText: {
      color: '#E0E0E0',
      fontSize: 15,
      lineHeight: 22,
      flex: 1,
  }
});
