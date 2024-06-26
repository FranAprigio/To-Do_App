import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PieChart, BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Navbar from '../components/Navbar';

const screenWidth = Dimensions.get('window').width;

export default function Statistics() {
    const [taskTypes, setTaskTypes] = useState([]);
    const [taskCounts, setTaskCounts] = useState({});

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('tasks');
            if (savedTasks !== null) {
                const tasks = JSON.parse(savedTasks);
                const types = {};
                const counts = {};

                tasks.forEach(task => {
                    // Graifco pizza
                    types[task.type] = (types[task.type] || 0) + 1;
                    
                    // Grafico Barra
                    const date = new Date(task.id);
                    const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                    counts[key] = (counts[key] || 0) + 1;
                });

                setTaskTypes(Object.entries(types).map(([key, value]) => ({
                    name: key,
                    count: value,
                })));
                setTaskCounts(counts);
            }
        } catch (error) {
            console.error('Erro ao carregar as tarefas:', error);
        }
    };

    const pieChartData = taskTypes.map(task => ({
        name: task.name,
        population: task.count,
        color: getRandomColor(),
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    }));

    const barChartData = {
        labels: Object.keys(taskCounts),
        datasets: [
            {
                data: Object.values(taskCounts),
            },
        ],
    };

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.graficos}>
                <Text style={styles.header}>Estatísticas de Tarefas</Text>
                <Text style={styles.chartTitle}>Distribuição de Tipos de Tarefas</Text>
                <PieChart
                    data={pieChartData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
                <Text style={styles.chartTitle}>Quantidade de Tarefas por Data</Text>
                <BarChart
                    data={barChartData}
                    width={screenWidth}
                    height={220}
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            </ScrollView>
            <Navbar />
        </View>

    );
}

const chartConfig = {
    backgroundGradientFrom: "#FFF",
    backgroundGradientTo: "#FFF",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
        borderRadius: 16,
    },
    propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726",
    },
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    graficos: {
        padding: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
});
