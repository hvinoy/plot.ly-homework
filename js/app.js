///initial data-display
d3.json("data/samples.json").then((data) => {
    console.log(data);
    console.log(data.samples[0]);
    var otu_ids = data.samples[0].otu_ids;
    console.log(otu_ids)
    var sample_values = data.samples[0].sample_values;
    console.log(sample_values);
    var otu_labels = data.samples[0].otu_labels;
    var top_labels = otu_labels.slice(0,10).reverse();
    console.log(top_labels);
    var top_values = sample_values.slice(0,10).reverse();
    console.log(top_values)
    var top_ids = otu_ids.slice(0,10).reverse();
    console.log(top_ids)
    var ids = top_ids.map(name => "OTU "+name);
    console.log(ids)
    var meta = data.metadata[0];
    console.log(meta)
    var names = data.names
    console.log(names)
    console.log(names.indexOf("1506"));

    //////////////////
    ///bonus variables
    
    var wfreq = data.metadata[0].wfreq
    console.log(wfreq)

//dropdown menu holder
names.forEach(function(id) {
  console.log(id);
  var dropdown = d3.select("#selDataset");
  var init_option = dropdown.append("option").property("value", id).text(id);

})

//var init = meta.id;
  //  console.log(init);
   // var dropdown = d3.select("#selDataset");
    //var init_option = dropdown.append("option").property("value", init).text(init);

// bar chart
var trace1 = {
    x: top_values,
    y: ids,
    type: "bar",
    orientation: 'h',
    name:top_labels
  };
  
  var data = [trace1];
  
  var layout = {
    title: "Top 10 Bacteria Cultures Found",
    xaxis:{title: "Sample Values"},
    yaxis: {title:"OTU ID"}
  };
  
  Plotly.newPlot("bar", data, layout);

  var trace2 = {
    x: otu_ids,
    y: sample_values,
    text:otu_labels,
    mode:'markers',
    marker: {
      size: sample_values,
      color:otu_ids}
      
  };
// bubble chart
  var data2 = [trace2];

  var layout2 = {
    title: 'Bacteria Cultures Per Sample',
    xaxis:{title: "OTU ID"},
    yaxis: {title:"Sample Values"},
    showlegend: false
  };

  Plotly.newPlot("bubble",data2,layout2)

  //metadata
  Object.entries(meta).forEach(function([key,value]) {
    console.log(key,value)
    console.log(key +": " + value);
    var demo_box = d3.select("#sample-metadata");
    var line = demo_box.append("h4");
    line.text(key.toUpperCase() +": " + value);
  });

  ////bonus chart
  
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "<span style='color:black'>Belly Button Washing Frequency<br><span style='color:#0124C0'>Scrubs Per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null,9]},
        bar: { color: "#0124C0" },
        steps: [
          { range: [0, 1], color: "#AAB6D6" },
          { range: [1,2], color: "#AAB6D6" },
          { range: [2, 3], color: "#8FA3D9" },
          { range: [3, 4], color: "#7489CE" },
          { range: [4, 5], color: "#6275CC" },
          { range: [5, 6], color: "#6275CC" },
          { range: [6, 7], color: "#5266C0" },
          { range: [7, 8], color: "#4750B8" },
          { range: [8, 9], color: "#4750B8" },

        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: wfreq
        }
      }
    }
  ];
  
  var layout = { width: 600, height: 450, margin: { t: 0, b: 0 },
                font:{color:" #0124C0"} };
  Plotly.newPlot('gauge', data, layout);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

d3.selectAll("#selDataset").on("change", optionChanged);

function optionChanged() {
  var dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  var input = dropdownMenu.property("value");
  console.log(input);
  d3.json("data/samples.json").then((data) => {
    var names = data.names
    console.log(names)
    /////bar and bubble chart variables
    var id = names.indexOf(input)
    console.log(id);
    var otu_ids = data.samples[id].otu_ids;
    console.log(otu_ids)
    var sample_values = data.samples[id].sample_values;
    console.log(sample_values);
    var otu_labels = data.samples[id].otu_labels;
    var top_labels = otu_labels.slice(0,10).reverse();
    console.log(top_labels);
    var top_values = sample_values.slice(0,10).reverse();
    console.log(top_values)
    var top_ids = otu_ids.slice(0,10).reverse();
    console.log(top_ids)
    var ids = top_ids.map(name => "OTU "+name);
    console.log(ids)
    ////demographics data variables
    var meta = data.metadata[id];
    console.log(meta)
    ////clear everything
    var bar_chart = d3.select("#bar");
    bar_chart.html("")
    var bubble_chart = d3.select("#bubble");
    bubble_chart.html("")
    var demo_box = d3.select("#sample-metadata");
    demo_box.html("");
    ///bonus variables
    
    var wfreq = data.metadata[id].wfreq
    console.log(wfreq)

    // bar chart
var trace1 = {
  x: top_values,
  y: ids,
  type: "bar",
  orientation: 'h',
  name:top_labels
};

var data = [trace1];

var layout = {
  title: "Top 10 Bacteria Cultures Found",
  xaxis:{title: "Sample Values"},
  yaxis: {title:"OTU ID"}
};

Plotly.newPlot("bar", data, layout);

var trace2 = {
  x: otu_ids,
  y: sample_values,
  text:otu_labels,
  mode:'markers',
  marker: {
    size: sample_values,
    color:otu_ids}
    
};

/// bubble chart
  var data2 = [trace2];

  var layout2 = {
    title: 'Bacteria Cultures Per Sample',
    xaxis:{title: "OTU ID"},
    yaxis: {title:"Sample Values"},
    showlegend: false
  };

  Plotly.newPlot("bubble",data2,layout2)

  ////metadata
  Object.entries(meta).forEach(function([key,value]) {
    console.log(key,value)
    console.log(key +": " + value);
    
    
    var line = demo_box.append("h4");
    line.text(key.toUpperCase() +": " + value);
  });

  ////bonus chart
  
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: wfreq,
      title: { text: "<span style='color:black'>Belly Button Washing Frequency<br><span style='color:#0124C0'>Scrubs Per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null,9]},
        bar: { color: "#0124C0" },
        steps: [
          { range: [0, 1], color: "#AAB6D6" },
          { range: [1,2], color: "#AAB6D6" },
          { range: [2, 3], color: "#8FA3D9" },
          { range: [3, 4], color: "#7489CE" },
          { range: [4, 5], color: "#6275CC" },
          { range: [5, 6], color: "#6275CC" },
          { range: [6, 7], color: "#5266C0" },
          { range: [7, 8], color: "#4750B8" },
          { range: [8, 9], color: "#4750B8" },

        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: wfreq
        }
      }
    }
  ];
  
  var layout = { width: 600, height: 450, margin: { t: 0, b: 0 },
                font:{color:" #0124C0"} };
  Plotly.newPlot('gauge', data, layout);
  });
  

}

  