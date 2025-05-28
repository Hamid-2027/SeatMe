import React, { useCallback, useMemo, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

interface StandardBottomSheetProps {
  children: React.ReactNode;
  snapPoints?: string[];
  index?: number;
  onChange?: (index: number) => void;
  enablePanDownToClose?: boolean;
}

/**
 * A standardized bottom sheet component for consistent UI across the app
 * 
 * @param children - Content to display inside the bottom sheet
 * @param snapPoints - Array of snap points as percentages (e.g. ['25%', '50%'])
 * @param index - Initial snap point index to show
 * @param onChange - Callback when the sheet position changes
 * @param enablePanDownToClose - Whether the sheet can be closed by dragging down
 */
const StandardBottomSheet: React.FC<StandardBottomSheetProps> = ({
  children,
  snapPoints = ['25%', '50%', '90%'],
  index = 0,
  onChange,
  enablePanDownToClose = true,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      onChange={onChange}
      enablePanDownToClose={enablePanDownToClose}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handleIndicator}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
  },
  handleIndicator: {
    backgroundColor: '#999999',
    width: 40,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});

export default StandardBottomSheet;
