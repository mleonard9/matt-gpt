import React, { useState, useEffect } from 'react';
import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react';
import ProfileModal from '../Modals/ProfileModal';
import ProfileTile from '../Profiles/ProfileTile';
import { v4 as uuidv4 } from 'uuid';
import { callOpenAiModelsApi } from '../../api/OpenAI';
import { mockProfiles } from '../../mock/mock';

function RightPanel ({ onAddChatWithProfile }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profiles, setProfiles] = useState(mockProfiles);
  const [editingProfile, setEditingProfile] = useState(null);
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [models, setModels] = useState([]);

  useEffect(() => {
    getModels();
  }, []);

  const getModels = async () => {
    const models = await callOpenAiModelsApi();
    setModels(models);
  };
    
  const onToggle = () => {  
    setIsCollapsed(!isCollapsed);
  }

  const openCreateProfileModal = () => {
    setEditingProfile({
      title: '',
      prompt: '',
      model: 'gpt-3.5-turbo',
      id: uuidv4(),
    });
    setShowModal(true);
  }

  const handleModalSubmit = (newProfile) => {
    getProfileById(newProfile.id) ? updateProfile(newProfile) : setProfiles([...profiles, newProfile]);

    setEditingProfile(null);
    setShowModal(false);
  };

  const updateProfile = (newProfile) => {
    const updatedProfiles = profiles.map(profile => profile.id === newProfile.id ? newProfile : profile);
    setProfiles(updatedProfiles);
  };

  const getProfileById = (id) => {  
    return profiles.find(profile => profile.id === id);
  }

  const handleEdit = (id) => {
    setEditingProfile(getProfileById(id));
    setShowModal(true);
  };

  const handleModalClose = () => {
    setEditingProfile(null);
    setShowModal(false);
  };

  const handleSelect = (id) => {
    activeProfileId === id ? setActiveProfileId(null) : setActiveProfileId(id);
  };

  const handleDelete = (id) => {
    setEditingProfile(null);
    setShowModal(false);
    if(profiles.length === 1) {
      setActiveProfileId(null);
      setProfiles([]);
      return;
    } else {
      const updatedProfiles = profiles.filter(profile => profile.id !== id);

      if (activeProfileId === id) {
        setActiveProfileId(updatedProfiles[0].id);
      }

      setProfiles(updatedProfiles);
    }
  }; 

  const handleAddChatWithProfile = (id) => {
    const profile = getProfileById(id);
    onAddChatWithProfile(profile);
  };
  
  return (
    <div className={`right-panel ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="right-panel-header">
        { isCollapsed ?
          <div className="right-panel-icon" onClick={onToggle}>
            <IconChevronLeft size={20} />
          </div>
          :
          <div className="right-panel-icon" onClick={onToggle}>
            <IconChevronRight size={20} />
          </div>
        }
        { !isCollapsed ? <div className="right-panel-header-button" onClick={openCreateProfileModal}>Create Profile</div> : ''}
      </div>
      { !isCollapsed ? 
      <div className="right-panel-body">
        {profiles.map((profile, index) => (
          <ProfileTile key={index} profile={profile} activeProfileId={activeProfileId} onAddChatWithProfile={handleAddChatWithProfile} onSelect={handleSelect} onEdit={handleEdit} />
        ))}
      </div>
      : ''}
      <ProfileModal show={showModal} initialProfile={editingProfile} models={models} onClose={handleModalClose} onSubmit={handleModalSubmit} onDelete={handleDelete} />
    </div>
  )
} 

export default RightPanel;