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
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import { Task } from './types';

const { width, height } = Dimensions.get('window');

const bgImage = { uri: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop' };

export default function App() {
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
      <StatusBar barStyle="light-content" />
      
      <ImageBackground 
        source={bgImage} 
        style={styles.backgroundImage}
        resizeMode="cover" 
      >
        <View style={styles.blueHeader} />

        <View style={styles.contentWrapper}>
          <View style={styles.headerTextSection}>
            <Text style={styles.title}>My Tasks</Text>
            <Text style={styles.subtitle}>
              {tasks.filter(t => !t.completed).length} items remaining
            </Text>
          </View>
          
          <TaskForm onAdd={addTask} />

          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{ paddingBottom: 30 }}
          >
            {tasks.map(t => (
              <TaskCard 
                key={t.id} 
                item={t} 
                onToggle={toggleTask} 
                onDelete={deleteTask} 
              />
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: width,
    height: height,
  },
  blueHeader: {
    position: 'absolute',
    top: 0,
    width: width,
    height: height * 0.4, 
    
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  contentWrapper: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerTextSection: {
    marginBottom: 25,
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 5,
  },
});