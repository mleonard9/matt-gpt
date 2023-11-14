import { IconPencil, IconSend } from '@tabler/icons-react';
import React from 'react';

function ProfileTile ({profile, onSelect, onEdit, onAddChatWithProfile, activeProfileId}) {
  const handleAddChatWithProfile = () => {
    onAddChatWithProfile(profile.id);
  };

  const handleSelect = () => {
    onSelect(profile.id);
  };

  const handleEdit = () => {
    onEdit(profile.id);
  };

  return (
    <div className={profile.id === activeProfileId ? "profile-item-active" : "profile-item"} key={profile.id} onClick={handleSelect}>
      {profile?.title}
      <div className="action-buttons">
        <div className="edit-button" onClick={handleEdit}>
          {profile.id === activeProfileId ? <IconPencil size={12} /> : ''}
        </div>
        <div className="use-button" onClick={handleAddChatWithProfile}>
          {profile.id === activeProfileId ? <IconSend size={12} /> : ''}
        </div>
      </div>
    </div>
  )
} 

export default ProfileTile;