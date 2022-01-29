import React from 'react';

export default function SettingsSectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <h3 className="settings-section__title">{title}</h3>
      <p className="settings-section__subtitle">{subtitle}</p>
    </div>
  );
}
