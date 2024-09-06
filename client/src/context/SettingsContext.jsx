import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const SettingsContext = createContext( {} );

export default SettingsContext;