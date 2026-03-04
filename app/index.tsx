import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  StatusBar, 
  ImageBackground, 
  Dimensions 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

const { width, height } = Dimensions.get('screen');

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await AsyncStorage.getItem('tasks');
        if (data) setTasks(JSON.parse(data));
      } catch (e) { console.error(e); }
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    setTasks([{ id: Date.now().toString(), title, completed: false }, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <View style={styles.backgroundContainer}>
        <View style={styles.blueGradientOverlay} />
      </View>

      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Text style={styles.title}>My ks</Text>
          <Text style={styles.subtitle}>{tasks.filter(t => !t.completed).length} items remaining</Text>
        </View>

        <TaskForm onAdd={addTask} />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
          {tasks.map(t => (
            <TaskCard key={t.id} item={t} onToggle={toggleTask} onDelete={deleteTask} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e3a8a', 
  },
  backgroundContainer: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  blueGradientOverlay: {
    flex: 1,
    backgroundColor: '#3b82f6',
  },
  wrapper: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  scrollPadding: {
    paddingBottom: 100,
  }
});