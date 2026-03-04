import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types';

interface Props {
  item: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ item, onToggle, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.content} 
        onPress={() => onToggle(item.id)} 
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, item.completed && styles.checked]}>
          {item.completed && <Text style={styles.checkMark}>✓</Text>}
        </View>
        <Text style={[styles.text, item.completed && styles.done]}>
          {item.title}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBox}>
        <Text style={styles.deleteText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    borderRadius: 18,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    flex: 1,
  },
  checkbox: { 
    width: 26, 
    height: 26, 
    borderRadius: 8, 
    borderWidth: 2, 
    borderColor: '#4E73DF',
    marginRight: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  checked: { 
    backgroundColor: '#1cc88a', 
    borderColor: '#1cc88a' 
  },
  checkMark: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 14 
  },
  text: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#2E384D' 
  },
  done: { 
    textDecorationLine: 'line-through', 
    color: '#B0B7C3' 
  },
  deleteBox: { 
    paddingHorizontal: 20, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteText: { 
    color: '#E74A3B', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});