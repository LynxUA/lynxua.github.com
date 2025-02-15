'use client'

import React from 'react'
import { ConfigProvider } from 'antd'
import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
	token: {
		colorPrimary: "#515863",
		colorInfo: "#515863",
		borderRadius: 4
	}
}

const withTheme = (node: React.ReactElement) => (
	<>
		<ConfigProvider
			theme={theme}
		>

				{node}
		</ConfigProvider>
	</>
)

export default withTheme
