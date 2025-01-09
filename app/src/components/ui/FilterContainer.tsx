import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';

const FilterComponent = () => {
  const [cloudProviders, setCloudProviders] = useState({
    AWS: true,
    Azure: true,
    GCP: false,
    Terraform: true,
  });

  const [priority, setPriority] = useState({
    None: false,
    Critical: true,
    High: false,
    Medium: false,
    Low: false,
  });

  const [enabled, setEnabled] = useState(true);

  const [toolTypes, setToolTypes] = useState({
    Scanning: true,
    IssueTracking: true,
    Alerting: false,
  });

  const [policyCategories, setPolicyCategories] = useState({
    Leaks: false,
    Secrets: true,
    'Cloud & IaC': true,
    SAST: false,
    SCA: false,
  });

  const [issueTracking, setIssueTracking] = useState({
    Jira: true,
    Asana: false,
    ClickUp: false,
  });

  const toggleCheckbox = (stateSetter, key) => {
    stateSetter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cloud Providers */}
      <View style={styles.section}>
        <Text style={styles.title}>Cloud & IaC Provider</Text>
        {Object.keys(cloudProviders).map((provider) => (
          <TouchableOpacity
            key={provider}
            style={styles.checkboxContainer}
            onPress={() => toggleCheckbox(setCloudProviders, provider)}
          >
            <View style={styles.checkbox}>
              {cloudProviders[provider] && <View style={styles.checkboxTick} />}
            </View>
            <Text style={styles.label}>{provider}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Priority */}
      <View style={styles.section}>
        <Text style={styles.title}>Priority</Text>
        {Object.keys(priority).map((level) => (
          <TouchableOpacity
            key={level}
            style={styles.checkboxContainer}
            onPress={() => toggleCheckbox(setPriority, level)}
          >
            <View style={styles.checkbox}>
              {priority[level] && <View style={styles.checkboxTick} />}
            </View>
            <Text style={styles.label}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Enabled */}
      <View style={styles.section}>
        <Text style={styles.title}>Enabled</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Yes</Text>
          <Switch
            value={enabled}
            onValueChange={() => setEnabled(!enabled)}
            thumbColor={enabled ? '#4caf50' : '#f44336'}
          />
        </View>
      </View>

      {/* Tool Type */}
      <View style={styles.section}>
        <Text style={styles.title}>Tool Type</Text>
        {Object.keys(toolTypes).map((tool) => (
          <TouchableOpacity
            key={tool}
            style={styles.checkboxContainer}
            onPress={() => toggleCheckbox(setToolTypes, tool)}
          >
            <View style={styles.checkbox}>
              {toolTypes[tool] && <View style={styles.checkboxTick} />}
            </View>
            <Text style={styles.label}>{tool}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Policy Categories */}
      <View style={styles.section}>
        <Text style={styles.title}>Policy Category</Text>
        {Object.keys(policyCategories).map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.checkboxContainer}
            onPress={() => toggleCheckbox(setPolicyCategories, category)}
          >
            <View style={styles.checkbox}>
              {policyCategories[category] && (
                <View style={styles.checkboxTick} />
              )}
            </View>
            <Text style={styles.label}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Issue Tracking */}
      <View style={styles.section}>
        <Text style={styles.title}>Issue Tracking</Text>
        {Object.keys(issueTracking).map((tool) => (
          <TouchableOpacity
            key={tool}
            style={styles.checkboxContainer}
            onPress={() => toggleCheckbox(setIssueTracking, tool)}
          >
            <View style={styles.checkbox}>
              {issueTracking[tool] && <View style={styles.checkboxTick} />}
            </View>
            <Text style={styles.label}>{tool}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxTick: {
    width: 12,
    height: 12,
    backgroundColor: '#000',
  },
  label: {
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default FilterComponent;
