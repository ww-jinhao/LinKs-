<template>
  <el-upload class="avatar-uploader" action="#" :http-request="upload" :show-file-list="false"
    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon">
      <Plus />
    </el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'
import axios from 'axios';
import { useUserDataStore } from '@/stores/userData';

const userDataStore = useUserDataStore()
const imageUrl = ref('')

const uploadHeaders = {
  "Content-Type": "multipart/form-data",
  "Authorization": "Bearer 1615|nAmU124eNLr2fQGO0UEZlHCaL4v2FAb8HCszaulV",
  "Accept": "application/json"
}

function upload(file:any) {
      const formData = new FormData();
      formData.append('file', file.file);
      axios.post('https://7bu.top/api/v1/upload', formData, {
        headers: uploadHeaders
      }).then((res) => {
        const url = res.data.data.links.url
        userDataStore.userData.avatar = url
      });

}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('头像图片只能是jpg或jpeg文件')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像图片最大只能有 2MB!')
    return false
  }
  return true
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
