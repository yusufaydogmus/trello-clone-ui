<template>
  <div>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white p-8 rounded-lg shadow-md" style="width: 80%; max-width: 800px;">
        <Form :validation-schema="schema" @submit="handleSubmit">
          <div class="mb-12">
            <label class="font-semibold">Kart Adı:</label>
            <Field type="text" class="form-control w-full border" name="name" v-model="selectedCard.name" :validateOnBlur=isValidateOnBlur />
             
            <ErrorMessage name="name" class="text-red-500 font-semibold"/>
          </div>

          <div class="mb-12">
            <label class="font-semibold">Açıklama:</label>
            <Field type="text" name="description">
              <DxTextArea
                v-model="selectedCard.description"
                :input-attr="{ 'aria-label': 'Description' }"
                class="w-full h-48"
                @blur="validateField('description')" 
              />
            </Field>
            <ErrorMessage name="description" class="text-danger"/>
          </div>
          <button   type="submit" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Kapat</button>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, reactive, watch } from 'vue';
import { Field, Form, useForm, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import DxTextBox from "devextreme-vue/text-box";
import DxTextArea from "devextreme-vue/text-area";

const { isOpen, selectedCard } = defineProps(['isOpen', 'selectedCard']);
const emit = defineEmits(['close']);
const errorCount=ref(0);
const form = useForm();
const closeModal = () => {
  emit('close');
};
const isValidateOnBlur=true;

const schema = yup.object({
  name: yup.string()
    .required('Kart Adı zorunlu bir alandır')
    
    .min(3,"Kart Adı minimum 3 karakterden oluşmalıdır")
    .max(30,"Kart Adı 30 karakter ile sınırlıdır."),
   
    description: yup.string(),
});

const validateField = async (fieldName) => {
  try {
    await form.validate(fieldName);
    errorCount.value=Object.keys(form.errors).length;
  } catch (error) {
    // Alan doğrulama hatası
  }
};


const handleSubmit = async () => {
  try {
    await form.validate();
    // Form doğrulama başarılıysa işlem yapabilirsiniz.
    closeModal();
  } catch (error) {
    // Form doğrulama başarısız oldu.
  }
};
</script>
