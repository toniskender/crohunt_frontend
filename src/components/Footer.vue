<template>
  <footer>
    <p>&copy; 2024 Moja Web Stranica. Sva prava pridržana.</p>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent'
};
</script>

<style scoped>
footer {
  background-color: #505b3e; 
  color: white; 
  text-align: center;
  padding: 10px 20px; 
  border-top: 2px solid #ccc; 
  position: relative; 
  bottom: 0;
  width: 100%;
}

footer p {
  margin: 0; 
}
</style>