import React from 'react';
import './Segment.css';

export default function Segment({ children }) {
  return <div className="ui-segment">{children}</div>;
}

function SegmentHeader({ children }) {
  return <div className="ui-segment__header">{children}</div>;
}

function SegmentBody({ children }) {
  return <div className="ui-segment__body">{children}</div>;
}

function SegmentGroup({ children }) {
  return <div className="ui-segment__group">{children}</div>;
}

function SegmentActions({ children }) {
  return <div className="ui-segment__actions">{children}</div>;
}

function SegmentSpacer() {
  return <div className="ui-segment__spacer" />;
}

Segment.Header = SegmentHeader;
Segment.Body = SegmentBody;
Segment.Group = SegmentGroup;
Segment.Actions = SegmentActions;
Segment.Spacer = SegmentSpacer;
