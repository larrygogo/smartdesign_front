export const state = () => ({
    count: 1,
    width: 1280,
    height: 720,
    background: "#ffffff",
    currentIndex: -1,
    templateScale: 100, 
    layers: [],
    tools: {
        layers: false
    }
})

export const mutations = {
    initTemplate: (state) => {
        state.count = 1
        state.width = 1280
        state.height = 720
        state.background = "#ffffff"
        state.currentIndex = -1
        state.templateScale = 100
        state.layers = []
        state.tools = {
            layers: false
        }
    },
    changeLayer: (state, {
        index,
        attr,
        value
    }) => {
        if(attr === "value") {
            state.layers[index].value = value
        } else if(attr === "name") {
            state.layers[index].name = value
        } else {
            state.layers[index].style[attr] = value
        }
    },
    addLayer: (state, layer) => {
        state.layers.push(layer)
        state.currentIndex = state.layers.length - 1
        state.count++
    },
    deleteLayer: (state, index) => {
        state.currentIndex = -1
        state.layers.splice(index, 1)
    },
    moveLayer: (state, {top, left, index}) => {
        state.layers[index].style.top = top
        state.layers[index].style.left = left
    },
    changeLayerSize: (state, {width, height, index}) => {
        if(state.layers[index].type === 'text') {
            state.layers[index].style.width = width
        } else {
            state.layers[index].style.width = width
            state.layers[index].style.height = height
        }
    },
    editLayer: (state, index) => {
        state.currentIndex = index
    },
    setTemplate: (state, {attr, value}) => {
        if(attr === "width") {
            state.width = value
        } else if(attr === "height") {
            state.height = value
        } else if(attr === "scale") {
            state.templateScale = value
        } else if(attr === "background") {
            state.background = value
        } else if(attr === "currentIndex") {
            state.currentIndex = value
        } else if(attr === "layersTool") {
            state.tools.layers = value
        } else if(attr === "count") {
            state.count = value
        } else if(attr === "layers") {
            state.layers = value
        }
    }
}

export const actions = {

}