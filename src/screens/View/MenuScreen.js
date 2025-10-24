import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLORS, FONTS } from '../../constants';
import { FONT_SIZE, rh } from '../../utils/spacing';
import HeaderComponent from '../../components/HeaderComponent';
import CustomTitle from '../../components/CustomTitle';
import CustomToggle from '../../components/CustomToggle';
import { useMenu } from '../../services/MenuProvider';
import { toggleMenuItemAvailability } from '../../services/DashboardService';

// removed mocked categories; data now comes from API via useMenu

export default function MenuScreen() {
  const { menu, loading, refresh } = useMenu();
  const [availabilityById, setAvailabilityById] = useState({});

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.img} style={styles.image} />
      <View style={styles.textBox}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.price}>Rs. {item.price}</Text>
      </View>
      <CustomToggle
        isActive={!!availabilityById[item.id]}
        onToggle={async () => {
          // Optimistic UI update
          setAvailabilityById(prev => ({ ...prev, [item.id]: !prev[item.id] }));
          try {
            await toggleMenuItemAvailability(item.id);
            await refresh();
          } catch (e) {
            // Revert on failure
            setAvailabilityById(prev => ({
              ...prev,
              [item.id]: !prev[item.id],
            }));
          }
        }}
      />
    </View>
  );

  const categories = useMemo(() => {
    // Transform API shape to screen's expected flat list per category
    // API: [{ id, name, menu_items: [...] }]
    return (menu || []).map(cat => ({
      id: String(cat?.id ?? ''),
      title: cat?.name || 'Category',
      data: (cat?.menu_items || []).map(item => ({
        id: String(item?.id ?? ''),
        name: item?.name ?? '',
        price: Number(item?.price ?? 0),
        img: require('../../assets/images/Menu/item.png'),
        is_available: item?.is_available === 1,
      })),
    }));
  }, [menu]);

  React.useEffect(() => {
    // Initialize availability map from API data whenever menu changes
    const next = {};
    (menu || []).forEach(cat => {
      (cat?.menu_items || []).forEach(item => {
        const id = String(item?.id ?? '');
        if (id) next[id] = item?.is_available === 1;
      });
    });
    setAvailabilityById(next);
  }, [menu]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <HeaderComponent
        title=""
        leftIcon="chevron"
        isCircle
        rightIcon={require('../../assets/images/Header/notification.png')}
      />

      <CustomTitle variant="title">Menu</CustomTitle>
      <CustomTitle variant="subtitle">Main menu</CustomTitle>
      {loading ? (
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ marginTop: rh(10) }}
        />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={item => item.id || item.title}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.header}>{item.title}</Text>
              {item.data.map(menu => (
                <View key={menu.id}>{renderItem({ item: menu })}</View>
              ))}
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ marginTop: rh(4), color: COLORS.grayText }}>
              No menu items found.
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontFamily: FONTS.bold700,
    fontSize: FONT_SIZE.large,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: rh(3),
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderGray,
    paddingVertical: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  textBox: {
    flex: 1,
  },
  itemName: {
    fontFamily: FONTS.medium500,
    fontSize: FONT_SIZE.normal,
    color: COLORS.text,
  },
  price: {
    fontFamily: FONTS.regular400,
    fontSize: FONT_SIZE.small,
    color: COLORS.gray,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
  },
});
