import { describe, it, expect, beforeEach } from 'vitest';
import { useSelectedItemsStore } from '../../../store';

describe('selectedItemsStore', () => {
  beforeEach(() => {
    useSelectedItemsStore.setState({
      selectedItems: [],
    });
  });

  it('adds item', () => {
    useSelectedItemsStore.getState().addItem('1');

    expect(useSelectedItemsStore.getState().selectedItems).toEqual(['1']);
  });

  it('removes item', () => {
    useSelectedItemsStore.setState({
      selectedItems: ['1', '2'],
    });

    useSelectedItemsStore.getState().removeItem('1');

    expect(useSelectedItemsStore.getState().selectedItems).toEqual(['2']);
  });

  it('clears items', () => {
    useSelectedItemsStore.setState({
      selectedItems: ['1', '2'],
    });

    useSelectedItemsStore.getState().clearItems();

    expect(useSelectedItemsStore.getState().selectedItems).toEqual([]);
  });

  it('checks if item is selected', () => {
    useSelectedItemsStore.setState({
      selectedItems: ['1'],
    });

    expect(useSelectedItemsStore.getState().isSelected('1')).toBe(true);

    expect(useSelectedItemsStore.getState().isSelected('2')).toBe(false);
  });

  it('toggleItem adds item if not selected', () => {
    useSelectedItemsStore.getState().toggleItem('1');

    expect(useSelectedItemsStore.getState().selectedItems).toEqual(['1']);
  });

  it('toggleItem removes item if selected', () => {
    useSelectedItemsStore.setState({
      selectedItems: ['1'],
    });

    useSelectedItemsStore.getState().toggleItem('1');

    expect(useSelectedItemsStore.getState().selectedItems).toEqual([]);
  });

  it('toggleItems adds unselected items', () => {
    useSelectedItemsStore.setState({
      selectedItems: ['1'],
    });

    useSelectedItemsStore.getState().toggleItems(['2', '3']);

    expect(useSelectedItemsStore.getState().selectedItems).toEqual([
      '1',
      '2',
      '3',
    ]);
  });

  it('toggleItems removes selected items', () => {
    useSelectedItemsStore.setState({
      selectedItems: ['1', '2', '3'],
    });

    useSelectedItemsStore.getState().toggleItems(['2', '3']);

    expect(useSelectedItemsStore.getState().selectedItems).toEqual(['1']);
  });

  it('toggleItems mixes add and remove operations', () => {
    useSelectedItemsStore.setState({
      selectedItems: ['1', '2'],
    });

    useSelectedItemsStore.getState().toggleItems(['2', '3']);

    expect(useSelectedItemsStore.getState().selectedItems).toEqual(['1', '3']);
  });
});
