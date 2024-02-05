import React from 'react'
import { Stack, Text } from '@chakra-ui/react'
import { useTypebot } from '@/features/editor/providers/TypebotProvider'
import { SetVariableLabel } from '@/components/SetVariableLabel'
import { ZemanticAiBlock } from '@typebot.io/schemas'

type Props = {
  options: ZemanticAiBlock['options']
}

export const ZemanticAiNodeBody = ({
  options: { query, projectId, responseMapping } = {},
}: Props) => {
  const { typebot } = useTypebot()
  return (
    <Stack>
      <Text
        color={query && projectId ? 'currentcolor' : 'gray.500'}
        noOfLines={1}
      >
        {query && projectId ? `Ask: ${query}` : 'Configure...'}
      </Text>
      {typebot &&
        responseMapping
          ?.map((mapping) => mapping.variableId)
          .map((variableId, idx) =>
            variableId ? (
              <SetVariableLabel
                key={variableId + idx}
                variables={typebot.variables}
                variableId={variableId}
              />
            ) : null
          )}
    </Stack>
  )
}
