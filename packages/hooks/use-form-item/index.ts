/*
 * @Author: qiye
 * @Date: 2021-10-19 16:47:07
 * @LastEditors: qiye
 * @LastEditTime: 2021-10-19 17:17:58
 * @Description: file content
 */

import { inject, computed, getCurrentInstance, unref } from 'vue'
import { elFormKey, elFormItemKey } from '../../tokens'
import { buildProps } from '../../utils/props'
import { useGlobalConfig } from '../../utils/util'

import type { ExtractPropTypes } from 'vue'
import type { MaybeRef } from '@vueuse/core'

const sizes = ['', 'large', 'medium', 'small', 'mini'] as const

export const useFormItemProps = buildProps({
  size: {
    type: String,
    values: sizes,
    default: '',
  },
  disabled: Boolean,
} as const)

export type UseFormItemProps = ExtractPropTypes<typeof useFormItemProps>

export type LocalFallbacks = {
  size?: MaybeRef<UseFormItemProps['size'] | undefined>
  disabled?: MaybeRef<UseFormItemProps['disabled'] | undefined>
}

export const useFormItem = ({ size, disabled }: LocalFallbacks) => {
  const vm = getCurrentInstance()
  const $ELEMENT = useGlobalConfig()

  // vm.props is not reactive so we use the reactive one here.
  const props = vm.proxy.$props as UseFormItemProps
  const form = inject(elFormKey, undefined)
  const formItem = inject(elFormItemKey, undefined)

  return {
    size: computed(() => {
      // TODO, fallback to default size like 'medium/large' instead of empty string
      return (
        props.size ||
        unref(size) ||
        formItem?.size ||
        form?.size ||
        $ELEMENT.size ||
        ''
      )
    }),
    disabled: computed(() => {
      return (
        props.disabled === true || unref(disabled) || form?.disabled || false
      )
    }),
  }
}