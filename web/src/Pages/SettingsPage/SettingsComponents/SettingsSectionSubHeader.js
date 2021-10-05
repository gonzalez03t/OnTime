import React from 'react';

export default function SettingsSectionSubHeader({ title, subtitle }) {
  return (
    <div class="section-subheader">
      <h3 className="settings-section__title">{title}</h3>
      <p className="settings-section__subtitle">{subtitle}</p>
    </div>
  );
}
